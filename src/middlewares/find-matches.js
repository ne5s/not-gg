import {
	userService,
	matchService,
	summonerSoloService,
	summonerFlexService,
} from '../services';
import axios from 'axios';

async function findMatches(req, res, next) {
	try {
		// meta data 가져오는 곳
		const spell_jsoned = {}; // key : code , value : SummonerTeleport
		let db_match_data = {};
		let db_solo_rank = {};
		let db_flex_rank = {};
		let db_matchId_list = [];

		const recent_json = await axios.get(
			`https://ddragon.leagueoflegends.com/api/versions.json`,
		);
		const recent_version = recent_json.data[0];

		const spell_json = await axios.get(
			`https://ddragon.leagueoflegends.com/cdn/${recent_version}/data/en_US/summoner.json`,
		);
		const spell = spell_json.data.data;

		for (const [keys, value] of Object.entries(spell)) {
			spell_jsoned[value.key] = keys;
		}

		const runes_json = await axios.get(
			`https://ddragon.leagueoflegends.com/cdn/${recent_version}/data/en_US/runesReforged.json`,
		);
		const rune = runes_json.data;

		// 입력으로 (메인룬 소속코드(지배), 메인 룬(감전), 부룬 소속코드(영감)) -> return [메인 룬 이미지url, 부분 소속이미지url]
		function Rune_Check(perk1, perk1_2, perk2) {
			const main_rune = rune.find((e) => e.id == perk1).slots[0].runes;
			let first_rune = main_rune.find((e) => e.id == perk1_2).icon;
			first_rune = `https://ddragon.leagueoflegends.com/cdn/img/${first_rune}`;
			let second_rune = rune.find((e) => e.id == perk2).icon;
			second_rune = `https://ddragon.leagueoflegends.com/cdn/img/${second_rune}`;
			return [first_rune, second_rune];
		}

		// API 날리기 위한 준비값들
		// const nickname = req.body.name
		const joinedSummonerName = req.currentUserId;
		// 이 소환사명으로 이제 검색하고, match 스키마에 저장하면 됨.
		console.log('joinedSummonerName : ' + joinedSummonerName);
		const headers = {
			'X-Riot-Token': process.env.RIOT_API_KEY,
		};

		let response = await axios.get(
			`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${joinedSummonerName}`,
			{ headers },
		);
		const { id, profileIconId, puuid, summonerLevel } = response.data;
		console.log(id, profileIconId, puuid, summonerLevel);
		// console.log(
		// 	`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/profileicon/${profileIconId}.png`,
		// );
		const profileIconURL = `https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/profileicon/${profileIconId}.png`;
		console.log('profileIconURL : ' + profileIconURL);
		// 여기까지 저장할 목록 : profileIconURL, summonerLevel

		// 소환사 정보 가져오는 곳
		const InfoData = await axios.get(
			`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`,
			{ headers },
		);
		const { tier, rank, summonerName, leaguePoints, wins, losses, miniSeries } =
			InfoData.data[0];
		console.log(
			tier,
			rank,
			summonerName,
			leaguePoints,
			wins,
			losses,
			miniSeries,
		);
		db_solo_rank = {
			tier,
			rank,
			summonerName,
			leaguePoints,
			wins,
			losses,
			...(miniSeries && { miniSeries }), // 없을 수 있어서
		};

		// 솔로랭크, 자유랭크 DB 넣기
		const createdNewSolo = await summonerSoloService.addSummonerSolo(
			db_solo_rank,
		);

		// 자유랭크 있는 지 확인, 있으면 가져와서 변수에 넣음
		if (InfoData.data[1]) {
			const {
				tier: tier2,
				rank: rank2,
				summonerName: summonerName2,
				leaguePoints: leaguePoints2,
				wins: wins2,
				losses: losses2,
				miniSeries: miniSeries2,
			} = InfoData.data[1];
			// console.log(
			// 	tier2,
			// 	rank2,
			// 	summonerName2,
			// 	leaguePoints2,
			// 	wins2,
			// 	losses2,
			// 	miniSeries2,
			// );

			db_flex_rank = {
				tier: tier2,
				rank: rank2,
				summonerName: summonerName2,
				leaguePoints: leaguePoints2,
				wins: wins2,
				losses: losses2,
				...(miniSeries2 && { miniSeries: miniSeries2 }), // 없을 수 있어서
			};
			// 자유랭크 DB 넣기
			const createdNewFlex = await summonerFlexService.addSummonerFlex(
				db_flex_rank,
			);
		}

		// 여기서부터 match 조회, 솔로랭크만??
		const matches = await axios.get(
			`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&start=0&count=20`,
			{ headers },
		);

		db_matchId_list = matches.data;
		const updatedUser = await userService.setMatchIdList(joinedSummonerName, {
			matchIdList: db_matchId_list,
		});

		// 한 경기마다 정보 가져와서 DB 삽입
		for (let idx = 0; idx < matches.data.length; idx++) {
			const matchId = matches.data[idx];
			const match = await axios.get(
				`https://asia.api.riotgames.com/lol/match/v5/matches/${matches.data[idx]}`,
				{ headers },
			);
			const gameDurationForCS = (match.data.info.gameDuration / 60).toFixed(1);
			let gameDuration = match.data.info.gameDuration / 60;
			gameDuration = String(gameDuration).split('.');
			gameDuration = gameDuration[0] + ':' + (gameDuration[1] / 100) * 60;
			console.log(gameDuration);
			const gameStartTimestamp = match.data.info.gameStartTimestamp;
			const gameEndTimestamp = match.data.info.gameEndTimestamp;
			const queueId = match.data.info.queueId;

			// match_data 는 [ {} * 10 ] 의 배열
			const match_data = match.data.info.participants;
			let users = [];
			let killPlusAssist = [];
			for (let i of match_data) {
				console.log(i.champLevel);
				const champLevel = i.champLevel;
				const championName = i.championName;
				const championImageURL = `https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/champion/${championName}.png`;
				console.log(championImageURL);
				const assists = i.assists;
				const deaths = i.deaths;
				const kills = i.kills;
				const kda = Number(i.challenges.kda.toFixed(2));
				console.log(kda);
				const cs = i.totalMinionsKilled + i.neutralMinionsKilled;
				console.log(cs);
				const csByMinute = Math.floor((cs / gameDurationForCS) * 10) / 10;
				console.log(csByMinute);
				const lane = i.teamPosition;
				console.log(lane);
				const spell1 = `https://ddragon.leagueoflegends.com/cdn/10.6.1/img/spell/${
					spell_jsoned[i.summoner1Id]
				}.png`;
				console.log(spell1);
				const spell2 = `https://ddragon.leagueoflegends.com/cdn/10.6.1/img/spell/${
					spell_jsoned[i.summoner2Id]
				}.png`;
				console.log(spell2);

				const perk1 = i.perks.styles[0].style;
				const perk1_2 = i.perks.styles[0].selections[0].perk;
				const perk2 = i.perks.styles[1].style;
				// runeData = [주룬, 부룬 소속] 의 이미지URL 값임
				const runeData = Rune_Check(perk1, perk1_2, perk2);
				console.log(runeData);

				// 오작동 발견
				// const killParticipation =
				// 	i.challenges.killParticipation.toFixed(2) * 100;
				// console.log(killParticipation);
				console.log(
					`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item0}.png`,
				);
				console.log(
					`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item1}.png`,
				);
				console.log(
					`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item2}.png`,
				);
				console.log(
					`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item3}.png`,
				);
				console.log(
					`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item4}.png`,
				);
				console.log(
					`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item5}.png`,
				);
				console.log(
					`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item6}.png`,
				);
				console.log(i.visionWardsBoughtInGame);
				const { visionWardsBoughtInGame, wardsKilled, wardsPlaced } = i;
				console.log(i.win);
				const win = i.win;
				const user_nickname = i.summonerName;
				const user_level = i.summonerLevel;
				const user_icon = `https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/champion/${i.championName}.png`;
				const {
					goldEarned,
					totalDamageDealtToChampions,
					totalDamageDealt,
					totalDamageTaken,
				} = i;
				game_user_dict[user_nickname] = user_icon;
				users.push({
					championName,
					championImageURL,
					champLevel,
					kills,
					deaths,
					assists,
					kda,
					lane,
					cs,
					summonerName: user_nickname,
					summonerLevel: user_level,
					win,
					goldEarned,
					totalDamageDealt,
					totalDamageDealtToChampions,
					totalDamageTaken,
					visionWardsBoughtInGame,
					wardsKilled,
					wardsPlaced,
					csByMinute,
					spell1,
					spell2,
					primaryStyle: runeData[0],
					subStyle: runeData[1],
				});
			}
			console.log(game_user_dict);

			db_match_data = {
				matchId,
				gameDuration,
				gameStartTimestamp,
				gameEndTimestamp,
				queueId,
			};
		}

		const match = await axios.get(
			`https://asia.api.riotgames.com/lol/match/v5/matches/${matches.data[0]}`,
			{ headers },
		);
		const gameDuration = (match.data.info.gameDuration / 60).toFixed(1);
		console.log(gameDuration);
		const match_data = match.data.info.participants;
		const game_user_dict = {};
		for (let i of match_data) {
			if (i.summonerName == summonerName) {
				console.log(i.champLevel);
				console.log(
					`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/champion/${i.championName}.png`,
				);
				const assists = i.assists;
				const deaths = i.deaths;
				const kills = i.kills;
				const kill_average = ((kills + assists) / deaths).toFixed(2);
				console.log(kill_average);
				const total_kill = i.totalMinionsKilled + i.neutralMinionsKilled;
				console.log(total_kill);
				const average_kill = Math.floor((total_kill / gameDuration) * 10) / 10;
				console.log(average_kill);
				console.log(i.teamPosition);
				console.log(
					`https://ddragon.leagueoflegends.com/cdn/10.6.1/img/spell/${
						spell_jsoned[i.summoner1Id]
					}.png`,
				);
				console.log(
					`https://ddragon.leagueoflegends.com/cdn/10.6.1/img/spell/${
						spell_jsoned[i.summoner2Id]
					}.png`,
				);

				const perk1 = i.perks.styles[0].style;
				const perk1_2 = i.perks.styles[0].selections[0].perk;
				const perk2 = i.perks.styles[1].style;
				const runeData = Rune_Check(perk1, perk1_2, perk2);
				console.log(runeData);
				const killParticipation =
					i.challenges.killParticipation.toFixed(2) * 100;
				console.log(killParticipation);
				console.log(
					`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item0}.png`,
				);
				console.log(
					`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item1}.png`,
				);
				console.log(
					`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item2}.png`,
				);
				console.log(
					`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item3}.png`,
				);
				console.log(
					`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item4}.png`,
				);
				console.log(
					`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item5}.png`,
				);
				console.log(
					`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item6}.png`,
				);
				console.log(i.visionWardsBoughtInGame);
				console.log(i.win);
			}
			const user_nick = i.summonerName;
			const user_icon = `https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/champion/${i.championName}.png`;
			game_user_dict[user_nick] = user_icon;
		}
		console.log(game_user_dict);
	} catch (error) {
		throw new Error(error.message);
	}
}

export { findMatches };
