import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired, findMatches } from '../middlewares';
import {
	userService,
	summonerSoloService,
	summonerFlexService,
	matchService,
} from '../services';
import axios from 'axios';

const userRouter = Router();

// 회원가입 api (아래는 /register이지만, 실제로는 /api/register로 요청해야 함.)
userRouter.post(
	'/register',
	async (req, res, next) => {
		try {
			// Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
			// application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
			if (is.emptyObject(req.body)) {
				throw new Error(
					'headers의 Content-Type을 application/json으로 설정해주세요',
				);
			}

			// req (request)의 body 에서 데이터 가져오기
			const { id, password, name, summonerName } = req.body;

			// 위 데이터를 유저 db에 추가하기
			const newUser = await userService.addUser({
				id,
				password,
				name,
				summonerName,
			});

			// 소환사 등록 시 해당 소환사명으로 매치 검색 위해 req.currentUserId를 통해 유저의 소환사명에 접근 가능하게 됨
			req.currentUserId = summonerName;

			// 추가된 유저의 db 데이터를 프론트에 다시 보내줌
			// 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
			res.status(201).json(newUser);
			next();
		} catch (error) {
			next(error);
		}
	},
	findMatches,
);

// 로그인 api (아래는 /login 이지만, 실제로는 /api/login로 요청해야 함.)
userRouter.post('/login', async function (req, res, next) {
	try {
		// application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
		if (is.emptyObject(req.body)) {
			throw new Error(
				'headers의 Content-Type을 application/json으로 설정해주세요',
			);
		}

		// req (request) 에서 데이터 가져오기
		const { id, password } = req.body;

		// 로그인 진행 (로그인 성공 시 jwt 토큰을 프론트에 보내 줌)
		const userToken = await userService.getUserToken({ id, password });

		// jwt 토큰을 프론트에 보냄 (jwt 토큰은, 문자열임)
		res.status(200).json(userToken);
	} catch (error) {
		next(error);
	}
});

// 전적 조회 시 1. SummonerName으로 User 검색, matchList 가져온다. 2. summonerName으로 soloRank 검색 3. matchList로 match 데이터 가져온다.
userRouter.get('/search/:summonerName', async function (req, res, next) {
	try {
		// 검색 시 summonerName으로 요청
		const summonerName = req.params.summonerName;

		const user = await userService.getUserBySummonerName(summonerName);
		// ['1', '2', ... 총 20개] 의 배열, 매치정보 없으면 빈 배열
		const matchIdList = user.matchIdList;

		let soloRank;
		try {
			// 솔로랭크 전적 정보
			soloRank = await summonerSoloService.getSoloBySummonerName(summonerName);
			// // 자유랭크 전적 정보
			// const flexRank = await summonerFlexService.getFlexBySummonerName(summonerName);
		} catch (e) {
			console.log('솔로랭크 정보가 없습니다.');
			res.status(200).json(user);
			return;
		}

		const matchDataList = [];
		for (let i = 0; i < matchIdList.length; i++) {
			const match = await matchService.getMatch(matchIdList[i]);
			matchDataList.push(match);
		}

		res.status(200).json({
			user: user,
			soloRank: soloRank,
			match: matchDataList,
		});
	} catch (error) {
		next(error);
	}
});

// 전체 유저 목록을 가져옴 (배열 형태임)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
userRouter.get('/userlist', loginRequired, async function (req, res, next) {
	try {
		// 전체 사용자 목록을 얻음
		const users = await userService.getUsers();

		// 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});

// 사용자 정보 수정
// (예를 들어 /api/users/abc12345 로 요청하면 req.params.userId는 'abc12345' 문자열로 됨)
userRouter.patch('/users/:id', loginRequired, async function (req, res, next) {
	try {
		// content-type 을 application/json 로 프론트에서
		// 설정 안 하고 요청하면, body가 비어 있게 됨.
		if (is.emptyObject(req.body)) {
			throw new Error(
				'headers의 Content-Type을 application/json으로 설정해주세요',
			);
		}

		// params로부터 id를 가져옴
		const id = req.params.id;

		// body data 로부터 업데이트할 사용자 정보를 추출함.
		const {
			password,
			summonerName,
			role,
			puuid,
			encryptedSummonerId,
			profileIconId,
			summonerLevel,
		} = req.body;

		// body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
		const currentPassword = req.body.currentPassword;

		// currentPassword 없을 시, 진행 불가
		if (!currentPassword) {
			throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
		}

		const userInfoRequired = { id, currentPassword };

		// 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
		// 보내주었다면, 업데이트용 객체에 삽입함.
		const toUpdate = {
			...(summonerName && { summonerName }),
			...(password && { password }),
			...(profileIconId && { profileIconId }),
			...(role && { role }),
			...(summonerLevel && { summonerLevel }),
		};

		// 사용자 정보를 업데이트함.
		const updatedUserInfo = await userService.setUser(
			userInfoRequired,
			toUpdate,
		);

		// 업데이트 이후의 유저 데이터를 프론트에 보내 줌
		res.status(200).json(updatedUserInfo);
	} catch (error) {
		next(error);
	}
});
// 전적갱신 버튼 클릭 시 -> /api/users, summonerName을 body로 받음
userRouter.patch('/users', async (req, res, next) => {
	try {
		// const userId = req.currentUserId;
		// const {summonerName} = req.body;
		const joinedSummonerName = req.body.summonerName;
		// 이 소환사명으로 이제 검색하고, match 스키마에 저장하면 됨.
		console.log('joinedSummonerName : ' + joinedSummonerName);

		// meta data 가져오는 곳
		const spell_jsoned = {}; // key : code , value : SummonerTeleport
		let db_match_data = {};
		let db_solo_rank = {};
		let db_flex_rank = {};
		let db_matchId_list = [];
		// 이걸로 winRateFor20Games 구하기(승률),
		let winAndLossFor20Games = {
			summonerName: '',
			userNum: '',
			wins: 0,
			losses: 0,
			kills: 0,
			deaths: 0,
			assists: 0,
			killParticipation: 0,
		};
		let playChampsFor20Games = []; // 안에 {championName : 'nidalee', counts : 1, wins : 1, losses : 0, kda : 0}
		let playLineFor20Games = {
			TOP: 0,
			JUNGLE: 0,
			MIDDLE: 0,
			BOTTOM: 0,
			UTILITY: 0,
		}; // 20판 동안 한 라인

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
		// const joinedSummonerName = req.currentUserId;
		// body에서 summonerName 받음

		const headers = {
			'X-Riot-Token': process.env.RIOT_API_KEY,
		};
		const encodedSummonerName = encodeURI(joinedSummonerName);

		let response = await axios.get(
			`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodedSummonerName}`,
			{ headers },
		);
		const { id, profileIconId, puuid, summonerLevel } = response.data;
		console.log(id, profileIconId, puuid, summonerLevel);

		// console.log(
		// 	`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/profileicon/${profileIconId}.png`,
		// );
		const profileIconURL = `https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/profileicon/${profileIconId}.png`;
		// console.log('profileIconURL : ' + profileIconURL);
		// 여기까지 저장할 목록 : profileIconURL, summonerLevel

		// 소환사 정보 가져오는 곳
		const InfoData = await axios.get(
			`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`,
			{ headers },
		);
		if (InfoData.data.length === 0) {
			console.log('솔로랭크/자유랭크 정보가 없습니다.');
			return;
		}

		// 솔로랭크 / 자유랭크 나누기
		for (let m = 0; m < InfoData.data.length; m++) {
			if (InfoData.data[m].queueType === 'RANKED_SOLO_5x5') {
				const {
					tier,
					rank,
					summonerName,
					leaguePoints,
					wins,
					losses,
					miniSeries,
				} = InfoData.data[m];

				let tierToNumber;
				// 0 : CHALLENGER, 1 : GRANDMASTER, 2 : MASTER, 3 : DIAMOND, 4 : PLATINUM, 5 : GOLD, 6 : SILVER, 7 : BRONZE, 8 : IRON
				if (tier === 'CHALLENGER') tierToNumber = 0;
				else if (tier === 'GRANDMASTER') tierToNumber = 1;
				else if (tier === 'MASTER') tierToNumber = 2;
				else if (tier === 'DIAMOND') tierToNumber = 3;
				else if (tier === 'PLATINUM') tierToNumber = 4;
				else if (tier === 'GOLD') tierToNumber = 5;
				else if (tier === 'SILVER') tierToNumber = 6;
				else if (tier === 'BRONZE') tierToNumber = 7;
				else if (tier === 'IRON') tierToNumber = 8;

				db_solo_rank = {
					tier,
					rank,
					tierToNumber,
					summonerName,
					leaguePoints,
					wins,
					losses,
					winRate: ((wins / (wins + losses)).toFixed(4) * 100).toFixed(2),
					...(miniSeries && { miniSeries }), // 없을 수 있어서
				};

				// 솔로랭크 DB 업데이트
				const createdNewSolo = await summonerSoloService.setSolo(
					joinedSummonerName,
					db_solo_rank,
				);
			} else if (InfoData.data[m].queueType === 'RANKED_FLEX_SR') {
				const {
					tier,
					rank,
					summonerName,
					leaguePoints,
					wins,
					losses,
					miniSeries,
				} = InfoData.data[m];

				let tierToNumber;
				// 0 : CHALLENGER, 1 : GRANDMASTER, 2 : MASTER, 3 : DIAMOND, 4 : PLATINUM, 5 : GOLD, 6 : SILVER, 7 : BRONZE, 8 : IRON
				if (tier === 'CHALLENGER') tierToNumber = 0;
				else if (tier === 'GRANDMASTER') tierToNumber = 1;
				else if (tier === 'MASTER') tierToNumber = 2;
				else if (tier === 'DIAMOND') tierToNumber = 3;
				else if (tier === 'PLATINUM') tierToNumber = 4;
				else if (tier === 'GOLD') tierToNumber = 5;
				else if (tier === 'SILVER') tierToNumber = 6;
				else if (tier === 'BRONZE') tierToNumber = 7;
				else if (tier === 'IRON') tierToNumber = 8;

				db_flex_rank = {
					tier,
					rank,
					tierToNumber,
					summonerName,
					leaguePoints,
					wins,
					losses,
					winRate: ((wins / (wins + losses)).toFixed(4) * 100).toFixed(2),
					...(miniSeries && { miniSeries }), // 없을 수 있어서
				};

				// 자유랭크 DB 넣기
				const createdNewFlex = await summonerFlexService.setFlex(
					joinedSummonerName,
					db_flex_rank,
				);
			}
		}

		// 여기서부터 match 조회, 솔로랭크만??
		const matches = await axios.get(
			`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&start=0&count=20`,
			{ headers },
		);

		if (matches.data.length === 0) {
			console.log('최근 20경기 솔로랭크 매치전적이 없습니다.');
			return;
		}

		db_matchId_list = matches.data;
		const updatedUser = await userService.updateUserBySummonerName(
			joinedSummonerName,
			{
				matchIdList: db_matchId_list,
				summonerLevel,
				profileIconURL,
			},
		);

		// 한 경기마다 정보 가져와서 DB 삽입
		for (let idx = 0; idx < matches.data.length; idx++) {
			const matchId = matches.data[idx];
			const match = await axios.get(
				`https://asia.api.riotgames.com/lol/match/v5/matches/${matches.data[idx]}`,
				{ headers },
			);
			const gameDurationForCS = (match.data.info.gameDuration / 60).toFixed(1);
			let gameDuration = (match.data.info.gameDuration / 60).toFixed(2);
			gameDuration = String(gameDuration).split('.');
			gameDuration =
				gameDuration[0] +
				'분 ' +
				Math.round((gameDuration[1] / 100) * 60) +
				'초';
			// console.log(gameDuration);
			const gameStartTimestamp = new Date(match.data.info.gameStartTimestamp);
			const gameEndTimestamp = new Date(match.data.info.gameEndTimestamp);
			const queueId = match.data.info.queueId;

			// match_data 는 [ {} * 10 ] 의 배열
			const match_data = match.data.info.participants;
			let users = [];
			let whoIsWin = '';
			const game_user_dict = {};
			// 유저 1명씩 정보 가져옴 (블루 탑 --> 레드 서폿 순으로 내려감)
			for (let i of match_data) {
				// console.log(i.champLevel);
				const champLevel = i.champLevel;
				const championName = i.championName;
				const championImageURL = `https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/champion/${championName}.png`;
				// console.log(championImageURL);
				const assists = i.assists;
				const deaths = i.deaths;
				const kills = i.kills;
				const kda = Number(i.challenges.kda.toFixed(2));
				// console.log(kda);
				const cs = i.totalMinionsKilled + i.neutralMinionsKilled;
				// console.log(cs);
				const csByMinute = Math.floor((cs / gameDurationForCS) * 10) / 10;
				// console.log(csByMinute);
				const lane = i.teamPosition;
				// console.log(lane);
				const spell1 = `https://ddragon.leagueoflegends.com/cdn/10.6.1/img/spell/${
					spell_jsoned[i.summoner1Id]
				}.png`;
				// console.log(spell1);
				const spell2 = `https://ddragon.leagueoflegends.com/cdn/10.6.1/img/spell/${
					spell_jsoned[i.summoner2Id]
				}.png`;
				// console.log(spell2);

				const perk1 = i.perks.styles[0].style;
				const perk1_2 = i.perks.styles[0].selections[0].perk;
				const perk2 = i.perks.styles[1].style;
				// runeData = [주룬, 부룬 소속] 의 이미지URL 값임
				const runeData = Rune_Check(perk1, perk1_2, perk2);
				// console.log(runeData);

				// 오작동 발견
				// const killParticipation =
				// 	i.challenges.killParticipation.toFixed(2) * 100;
				// console.log(killParticipation);
				let item0;
				let item1;
				let item2;
				let item3;
				let item4;
				let item5;
				let item6;
				if (i.item0 !== 0) {
					item0 = `https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item0}.png`;
				}
				if (i.item1 !== 0) {
					item1 = `https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item1}.png`;
				}
				if (i.item2 !== 0) {
					item2 = `https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item2}.png`;
				}
				if (i.item3 !== 0) {
					item3 = `https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item3}.png`;
				}
				if (i.item4 !== 0) {
					item4 = `https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item4}.png`;
				}
				if (i.item5 !== 0) {
					item5 = `https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item5}.png`;
				}
				if (i.item6 !== 0) {
					item6 = `https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item6}.png`;
				}

				// console.log(i.visionWardsBoughtInGame);
				const { visionWardsBoughtInGame, wardsKilled, wardsPlaced } = i;
				// console.log(i.win);
				const win = i.win;
				const gameEndedInEarlySurrender = i.gameEndedInEarlySurrender;
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
					gameEndedInEarlySurrender,
					goldEarned,
					totalDamageDealt,
					totalDamageDealtToChampions,
					totalDamageTaken,
					visionWardsBoughtInGame,
					wardsKilled,
					wardsPlaced,
					csByMinute,
					...(item0 && { item0 }),
					...(item1 && { item1 }),
					...(item2 && { item2 }),
					...(item3 && { item3 }),
					...(item4 && { item4 }),
					...(item5 && { item5 }),
					...(item6 && { item6 }),
					spell1,
					spell2,
					primaryStyle: runeData[0],
					subStyle: runeData[1],
				});
			}
			let blueTotalKills = 0;
			for (let j = 0; j < 5; j++) {
				blueTotalKills += users[j].kills;
				if (users[j].win) {
					whoIsWin = 'blue';
				}
			}
			let redTotalKills = 0;
			for (let j = 5; j < 10; j++) {
				redTotalKills += users[j].kills;
				if (users[j].win) {
					whoIsWin = 'red';
				}
			}

			for (let j = 0; j < 5; j++) {
				if (blueTotalKills !== 0) {
					const killParticipation = Math.round(
						((users[j].kills + users[j].assists) / blueTotalKills).toFixed(2) *
							100,
					);
					users[j]['killParticipation'] = killParticipation;
				} else {
					users[j]['killParticipation'] = 0;
				}
			}
			for (let j = 5; j < 10; j++) {
				if (redTotalKills !== 0) {
					const killParticipation = Math.round(
						((users[j].kills + users[j].assists) / redTotalKills).toFixed(2) *
							100,
					);
					users[j]['killParticipation'] = killParticipation;
				} else {
					users[j]['killParticipation'] = 0;
				}
			}
			// console.log(users);

			for (let [idx, p] of users.entries()) {
				if (p.summonerName === joinedSummonerName) {
					winAndLossFor20Games['killParticipation'] += p.killParticipation;
					winAndLossFor20Games['summonerName'] = p.summonerName;
					winAndLossFor20Games['userNum'] = `user${idx}`;
					if (p.win) {
						winAndLossFor20Games['wins']++;
					} else {
						winAndLossFor20Games['losses']++;
					}
					winAndLossFor20Games['kills'] += p.kills;
					winAndLossFor20Games['deaths'] += p.deaths;
					winAndLossFor20Games['assists'] += p.assists;
					// 다음 것. 있으면 count/수치들만 +
					let flag = false;
					for (let c of playChampsFor20Games) {
						if (c.championName === p.championName) {
							c['counts']++;
							c['kda'] += Number(p.kda.toFixed(2));
							if (p.win) {
								c['wins']++;
							} else {
								c['losses']++;
							}
							flag = true;
							break;
						}
					}
					// [] 안에 없는 것이었다면 새로 push
					if (!flag) {
						let wins = 0;
						let losses = 0;
						if (p.win) {
							wins++;
						} else {
							losses++;
						}
						playChampsFor20Games.push({
							championName: p.championName,
							counts: 1,
							wins: wins,
							losses: losses,
							kda: Number(p.kda.toFixed(2)),
							championImageURL: `https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/champion/${p.championName}.png`,
						});
					}
					// playLineFor20Games
					if (p.lane === 'TOP') {
						playLineFor20Games['TOP']++;
					} else if (p.lane === 'JUNGLE') {
						playLineFor20Games['JUNGLE']++;
					} else if (p.lane === 'MIDDLE') {
						playLineFor20Games['MIDDLE']++;
					} else if (p.lane === 'BOTTOM') {
						playLineFor20Games['BOTTOM']++;
					} else {
						playLineFor20Games['UTILITY']++;
					}
				}
			}
			// console.log(game_user_dict);
			const listForGameSimply = Object.entries(game_user_dict);
			const gameSimply = {
				user1Id: listForGameSimply[0][0],
				user1Image: listForGameSimply[0][1],
				user2Id: listForGameSimply[1][0],
				user2Image: listForGameSimply[1][1],
				user3Id: listForGameSimply[2][0],
				user3Image: listForGameSimply[2][1],
				user4Id: listForGameSimply[3][0],
				user4Image: listForGameSimply[3][1],
				user5Id: listForGameSimply[4][0],
				user5Image: listForGameSimply[4][1],
				user6Id: listForGameSimply[5][0],
				user6Image: listForGameSimply[5][1],
				user7Id: listForGameSimply[6][0],
				user7Image: listForGameSimply[6][1],
				user8Id: listForGameSimply[7][0],
				user8Image: listForGameSimply[7][1],
				user9Id: listForGameSimply[8][0],
				user9Image: listForGameSimply[8][1],
				user10Id: listForGameSimply[9][0],
				user10Image: listForGameSimply[9][1],
			};
			db_match_data = {
				matchId,
				gameDuration,
				gameStartTimestamp,
				gameEndTimestamp,
				queueId,
				win: whoIsWin,
				user1: users[0],
				user2: users[1],
				user3: users[2],
				user4: users[3],
				user5: users[4],
				user6: users[5],
				user7: users[6],
				user8: users[7],
				user9: users[8],
				user10: users[9],
				gameSimply,
			};
			const createdMatch = await matchService.addMatch(db_match_data);
		}
		console.log('match 데이터 저장 완료');

		// summonerSolo 에 20경기에 대한 data 삽입
		let matchFor20Games = {
			wins: winAndLossFor20Games.wins,
			losses: winAndLossFor20Games.losses,
			winRate:
				(winAndLossFor20Games.wins /
					(winAndLossFor20Games.wins + winAndLossFor20Games.losses)) *
				100,
			killAverage: (winAndLossFor20Games.kills / 20).toFixed(1),
			deathAverage: (winAndLossFor20Games.deaths / 20).toFixed(1),
			assistAverage: (winAndLossFor20Games.assists / 20).toFixed(1),
			kdaAverage:
				(
					((winAndLossFor20Games.kills / 20).toFixed(1) +
						(winAndLossFor20Games.assists / 20).toFixed(1)) /
					(winAndLossFor20Games.deaths / 20).toFixed(1)
				).toFixed(2) + ':1',
			killParticipationAverage: Math.round(
				winAndLossFor20Games.killParticipation / 20,
			),
		};

		for (let index = 0; index < playChampsFor20Games.length; index++) {
			playChampsFor20Games[index] = {
				...playChampsFor20Games[index],
				kda: Number(
					(
						playChampsFor20Games[index].kda / playChampsFor20Games[index].counts
					).toFixed(2),
				),
			};
		}

		const sortedPlayChampsFor20Games = playChampsFor20Games.sort(function (
			a,
			b,
		) {
			return b.counts - a.counts;
		});
		// playLineFor20Games

		const updatedSolo = await summonerSoloService.setSolo(joinedSummonerName, {
			matchFor20Games: matchFor20Games,
			sortedPlayChampsFor20Games: sortedPlayChampsFor20Games,
			playLineFor20Games: playLineFor20Games,
		});

		console.log('20경기 데이터 저장 완료');
	} catch (error) {
		next(error);
	}
});

export { userRouter };
