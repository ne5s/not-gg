import * as Api from '/api.js';
import { getUserData } from '/utils/user.js';
import * as Useful from '/useful-functions.js';
const pvplogRenewalBtn = document.querySelector('#pvplogRenewal');

// 선호 포지션
const preferlinerate = document.getElementsByClassName('line-pick-rate');
//
const pvplogbox = document.querySelector('.pvplogbox');

const addEvent = () => {
	pvplogRenewalBtn.addEventListener('click', loading);
};
const loading = async () => {};
const getLogintoken = async () => {
	const url = location.pathname.replace(/\/pvplog\/([\d\w]*)\/?/g, '$1');
	const id = decodeURI(url).replace('/', '');
	const data = await Api.get('/api/userlist');
	const data2 = await Api.get('/api/soloRanking');
	const user = data.filter((res) => res.summonerName === id);
	const elicerank = data2.findIndex((res) => res.summonerName === id) + 1;
	const userinf = data2.filter((res) => res.summonerName === id);
	console.log(user, userinf, elicerank);
	const { summonerName, matchIdList, summonerLevel } = user[0];
	const {
		leaguePoints,
		matchFor20Games,
		playLineFor20Games,
		rank,
		sortedPlayChampsFor20Games,
		tier,
		tierToNumber,
		updatedAt,
		winRate,
	} = userinf[0];
	// console.log(userinf, summonerName, matchIdList);
	return {
		leaguePoints,
		matchFor20Games,
		playLineFor20Games,
		summonerLevel,
		rank,
		sortedPlayChampsFor20Games,
		tier,
		tierToNumber,
		updatedAt,
		winRate,
		summonerName,
		matchIdList,
		elicerank,
	};
};
const userdata = await getLogintoken();

//예시

// addEvent();
const PvPLog = (userdata) => {
	console.log(userdata);
	const not = 'notdb';
	const {
		leaguePoints,
		matchFor20Games,
		playLineFor20Games,
		rank,
		sortedPlayChampsFor20Games,
		tier,
		tierToNumber,
		updatedAt,
		summonerLevel,
		winRate,
		summonerName,
		matchIdList,
		elicerank,
	} = userdata;
	const playgamestate = Object.values(playLineFor20Games).reduce(
		(a, b) => a + b,
	);
	const currentplaydata = [];
	for (let i = 0; i < 3; i++) {
		if (sortedPlayChampsFor20Games[i]) {
			let a = `<div class="box-space-evenly" style="margin-top: 10px">
						<img
							class="champ h45w45 border-circle"
							src=${sortedPlayChampsFor20Games[i].championImageURL}
						/>
						<div class="champ-win-rate" style='width:40px'>${Math.floor(
							(sortedPlayChampsFor20Games[i].wins /
								(sortedPlayChampsFor20Games[i].wins +
									sortedPlayChampsFor20Games[i].losses)) *
								100,
						)}%</div>
						<div class="champ-play-games" style='width:60px'>(${
							sortedPlayChampsFor20Games[i].counts
						}게임)</div>
						<div class="champ-kda-rate" style='width:68px'>${sortedPlayChampsFor20Games[
							i
						].kda
							.toFixed(1)
							.replace('.', ':')} 평점</div>
					</div>`;
			currentplaydata.push(a);
		}
	}
	let current20games = [];
	// for() {
	// 	if (){
	// 		let game = `
	// 		<div class="box-space-between pd-1 topborder">
	// 			<div class="wincolorline"></div>
	// 			<div class="game-winlose-playtime flex-center-center-column">
	// 				<div class="winlose">승리</div>
	// 				<div class="playtime">15분 14초</div>
	// 			</div>
	// 			<div class="pick-champ-img h40w40">
	// 				<img
	// 					src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"
	// 					alt=""
	// 				/>
	// 			</div>
	// 			<div class="flex-center-center-column game-spells">
	// 				<img class="spell h28w28" />
	// 				<img class="spell h28w28" />
	// 			</div>
	// 			<div class="flex-center-center-column game-runes">
	// 				<img
	// 					class="rune h28w28"
	// 					src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"
	// 				/>
	// 				<img
	// 					class="rune h28w28"
	// 					src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png"
	// 				/>
	// 			</div>
	// 			<div class="flex-center-center-column game-kda">
	// 				<div>
	// 					<span class="game-kill">1</span> /
	// 					<span class="game-die">2</span> /
	// 					<span class="game-assist">2</span>
	// 				</div>
	// 				<span class="game-kda-rate">0.80:1 평점</span>
	// 			</div>
	// 			<div
	// 				class="flex-center-center-column game-level-cs-killInvolvement"
	// 			>
	// 				<span class="game-level">레벨 16</span>
	// 				<span class="game-cs">253(8.1)CS</span>
	// 				<span class="game-killInvolvement">킬관여 45%</span>
	// 			</div>
	// 			<div class="flex-center-center game-items">
	// 				<img class="item h28w28" />
	// 				<img class="item h28w28" />
	// 				<img class="item h28w28" />
	// 				<img class="item h28w28" />
	// 				<img class="item h28w28" />
	// 				<img class="item h28w28" />
	// 				<img class="accessory h28w28" />
	// 			</div>
	// 			<div class="flex-center-center">
	// 				<div class="controlward">
	// 					<img
	// 						src="/img/controlWard.png"
	// 						style="width: 16px; height: 16px; border-radius: 50%"
	// 						alt=""
	// 						srcset=""
	// 					/>
	// 					<div style="margin: 0 4px">제어와드</div>
	// 					<span>4</span>
	// 				</div>
	// 			</div>
	// 			<div class="flex">
	// 				<div class="blueteams">
	// 					<div class="blueteam flex">
	// 						<img src="" class="champImg h14w14" />
	// 						<div class="blue-summoner-1"></div>
	// 					</div>
	// 					<div class="blueteam flex">
	// 						<img src="" class="champImg h14w14" />
	// 						<div class="blue-summoner-2"></div>
	// 					</div>
	// 					<div class="blueteam flex">
	// 						<img src="" class="champImg h14w14" />
	// 						<div class="blue-summoner-3"></div>
	// 					</div>
	// 					<div class="blueteam flex">
	// 						<img
	// 							src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"
	// 							class="champImg h14w14"
	// 						/>
	// 						<div class="blue-summoner-4"></div>
	// 					</div>
	// 					<div class="blueteam flex">
	// 						<img
	// 							src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"
	// 							class="champImg h14w14"
	// 						/>
	// 						<div class="blue-summoner-5">입도열지마도구주제</div>
	// 					</div>
	// 				</div>
	// 				<div class="redteams">
	// 					<div class="redteam flex">
	// 						<img src="" class="champImg h14w14" />
	// 						<div class="blue-summoner-1"></div>
	// 					</div>
	// 					<div class="redteam flex">
	// 						<img src="" class="champImg h14w14" />
	// 						<div class="blue-summoner-2"></div>
	// 					</div>
	// 					<div class="redteam flex">
	// 						<img src="" class="champImg h14w14" />
	// 						<div class="blue-summoner-3"></div>
	// 					</div>
	// 					<div class="redteam flex">
	// 						<img src="" class="champImg h14w14" />
	// 						<div class="blue-summoner-4"></div>
	// 					</div>
	// 					<div class="redteam flex">
	// 						<img
	// 							src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"
	// 							class="champImg h14w14"
	// 						/>
	// 						<div class="blue-summoner-5">입도열지마도구주제</div>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 		`
	// 	}
	// }
	console.log(currentplaydata.join(''));
	const main = `
	<div class="row">
	<div class="col">
		<div class="item-name">
			<div class="icon-level-box">
				<img class="profile-icon" />
				<div class="profile-level">${summonerLevel}</div>
			</div>
			<div class="name-renewal-box">
				<div class="profile-name">${summonerName}</div>
				<div class="profile-ranking">엘레스 랭킹 ${elicerank}위</div>
				<div class='renewal'><button class="btn btn-renewal" id="pvplogRenewal">
				전적갱신
			</button><div class='renewaltime'>${Useful.timeForToday(updatedAt)}</div></div>
				
				
			</div>
		</div>
	</div>
</div>
<div class="row">
	<div class="col">
		<div class="item-box">
			<div class="solo-rank-inf-box">
				<div class="profile-currunt-ranking fs-20">S2022 솔로랭크</div>
				<hr />
				<div class="flex player-tier-inf">
					<div class="icon-tier-box">
						<img class="profile-tier-icon h140w140" />
					</div>
					<div class="rank-inf-box">
						<span class="profile-tier-name fs-24 font-inter-bold"
							>${tier}
							<span class="profile-tier-level fs-24 font-inter-bold"
								>${rank}</span
							></span
						>

						<div class="profile-league-point fs-14">
							리그 포인트 : ${leaguePoints}LP
						</div>
						<span class="profile-win-rate fs-14">승률 :</span>
						<span class="profile-win-rate-number fs-14">53.33%</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="margin-lr-10 gamebox">
		<div class="contentsbox">
			<div class="fs-20 color-505050">솔로랭크 (최근 20게임)</div>
			<hr />
			<div class="row">
				<div class="col">
					<div class="current-20game-winrate"  style='margin-left:12px'>${
						matchFor20Games.wins + matchFor20Games.losses
					}전 ${matchFor20Games.wins}승 ${matchFor20Games.losses}패</div>
					<div class="box-space-evenly" style="margin-top: 20px">
						<div
							class="pie-chart2"
							style="
								display: inline-block;
								position: relative;
								width: 110px;
								height: 110px;
								background: conic-gradient(
									#4990e2 0% ${matchFor20Games.winRate}%,
									#fa576f ${matchFor20Games.winRate}% 100%
								);
								border-radius: 50%;
							"
						>
							<span
								class="center"
								style="
									position: absolute;
									width: 82px;
									height: 82px;
									background: #fff;
									border-radius: 50%;
									top: 14px;
									left: 14px;
									display: flex;
									justify-content: center;
									align-items: center;
								"
								><div>${matchFor20Games.winRate}%</div></span
							>
						</div>
						<div class="current-20game-winrate">
							<div class="current-20game-kda">${matchFor20Games.killAverage}/${
		matchFor20Games.deathAverage
	}/${matchFor20Games.assistAverage}</div>
							<div class="current-20game-kdarate">${matchFor20Games.kdaAverage}</div>
							<div class="current-20game-killInvolvement">킬관여 ${
								matchFor20Games.killParticipationAverage
							}%</div>
						</div>
					</div>
				</div>

				<div class="col">
					<div style='margin-left:12px'>플래이한 챔피언
					${currentplaydata.join('')}</div></div>
				

				<div class="col">
					<div style='margin-left:12px'>선호 포지션</div>
					<div class="box-space-evenly" style="margin-top: 20px">
						<div class="line-rate">
							<div class="line-pick">
								<div class="line-pick-rate" style="height: ${
									100 + (playLineFor20Games.TOP / playgamestate) * -100
								}%"></div>
							</div>

							<img class="top-icon" src="/img/탑.png" />
						</div>
						<div class="line-rate">
							<div class="line-pick">
								<div class="line-pick-rate" style="height: ${
									100 + (playLineFor20Games.JUNGLE / playgamestate) * -100
								}%"></div>
							</div>
							<img class="jungle-icon" src="/img/정글.png" />
						</div>
						<div class="line-rate">
							<div class="line-pick">
								<div class="line-pick-rate" style="height: ${
									100 + (playLineFor20Games.MIDDLE / playgamestate) * -100
								}%"></div>
							</div>
							<img class="mid-icon" src="/img/미드.png" />
						</div>
						<div class="line-rate">
							<div class="line-pick">
								<div class="line-pick-rate" style="height: ${
									100 + (playLineFor20Games.BOTTOM / playgamestate) * -100
								}%"></div>
							</div>
							<img class="ad-icon" src="/img/원딜.png" />
						</div>
						<div class="line-rate">
							<div class="line-pick">
								<div class="line-pick-rate" style="height: ${
									100 + (playLineFor20Games.UTILITY / playgamestate) * -100
								}%"></div>
							</div>
							<img class="sup-icon" src="/img/서폿.png" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</div>
<div class="container">
<div class="row">
	<div class="col margin-lr-10">
		<div class="gamelogbox">
			<div class="box-space-between pd-1 topborder">
				<div class="wincolorline"></div>
				<div class="game-winlose-playtime flex-center-center-column">
					<div class="winlose">승리</div>
					<div class="playtime">15분 14초</div>
				</div>
				<div class="pick-champ-img h40w40">
					<img
						src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"
						alt=""
					/>
				</div>
				<div class="flex-center-center-column game-spells">
					<img class="spell h28w28" />
					<img class="spell h28w28" />
				</div>
				<div class="flex-center-center-column game-runes">
					<img
						class="rune h28w28"
						src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"
					/>
					<img
						class="rune h28w28"
						src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png"
					/>
				</div>
				<div class="flex-center-center-column game-kda">
					<div>
						<span class="game-kill">1</span> /
						<span class="game-die">2</span> /
						<span class="game-assist">2</span>
					</div>
					<span class="game-kda-rate">0.80:1 평점</span>
				</div>
				<div
					class="flex-center-center-column game-level-cs-killInvolvement"
				>
					<span class="game-level">레벨 16</span>
					<span class="game-cs">253(8.1)CS</span>
					<span class="game-killInvolvement">킬관여 45%</span>
				</div>
				<div class="flex-center-center game-items">
					<img class="item h28w28" />
					<img class="item h28w28" />
					<img class="item h28w28" />
					<img class="item h28w28" />
					<img class="item h28w28" />
					<img class="item h28w28" />
					<img class="accessory h28w28" />
				</div>
				<div class="flex-center-center">
					<div class="controlward">
						<img
							src="/img/controlWard.png"
							style="width: 16px; height: 16px; border-radius: 50%"
							alt=""
							srcset=""
						/>
						<div style="margin: 0 4px">제어와드</div>
						<span>4</span>
					</div>
				</div>
				<div class="flex">
					<div class="blueteams">
						<div class="blueteam flex">
							<img src="" class="champImg h14w14" />
							<div class="blue-summoner-1"></div>
						</div>
						<div class="blueteam flex">
							<img src="" class="champImg h14w14" />
							<div class="blue-summoner-2"></div>
						</div>
						<div class="blueteam flex">
							<img src="" class="champImg h14w14" />
							<div class="blue-summoner-3"></div>
						</div>
						<div class="blueteam flex">
							<img
								src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"
								class="champImg h14w14"
							/>
							<div class="blue-summoner-4"></div>
						</div>
						<div class="blueteam flex">
							<img
								src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"
								class="champImg h14w14"
							/>
							<div class="blue-summoner-5">입도열지마도구주제</div>
						</div>
					</div>
					<div class="redteams">
						<div class="redteam flex">
							<img src="" class="champImg h14w14" />
							<div class="blue-summoner-1"></div>
						</div>
						<div class="redteam flex">
							<img src="" class="champImg h14w14" />
							<div class="blue-summoner-2"></div>
						</div>
						<div class="redteam flex">
							<img src="" class="champImg h14w14" />
							<div class="blue-summoner-3"></div>
						</div>
						<div class="redteam flex">
							<img src="" class="champImg h14w14" />
							<div class="blue-summoner-4"></div>
						</div>
						<div class="redteam flex">
							<img
								src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"
								class="champImg h14w14"
							/>
							<div class="blue-summoner-5">입도열지마도구주제</div>
						</div>
					</div>
				</div>
			</div>
			<div class="box-space-between pd-1 topborder">
				<div class="wincolorline"></div>
				<div class="game-winlose-playtime flex-center-center-column">
					<div class="winlose">승리</div>
					<div class="playtime">15분 14초</div>
				</div>
				<div class="pick-champ-img h40w40">
					<img
						src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"
						alt=""
					/>
				</div>
				<div class="flex-center-center-column game-spells">
					<img class="spell h28w28" />
					<img class="spell h28w28" />
				</div>
				<div class="flex-center-center-column game-runes">
					<img
						class="rune h28w28"
						src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"
					/>
					<img
						class="rune h28w28"
						src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png"
					/>
				</div>
				<div class="flex-center-center-column game-kda">
					<div>
						<span class="game-kill">1</span> /
						<span class="game-die">2</span> /
						<span class="game-assist">2</span>
					</div>
					<span class="game-kda-rate">0.80:1 평점</span>
				</div>
				<div
					class="flex-center-center-column game-level-cs-killInvolvement"
				>
					<span class="game-level">레벨 16</span>
					<span class="game-cs">253(8.1)CS</span>
					<span class="game-killInvolvement">킬관여 45%</span>
				</div>
				<div class="flex-center-center game-items">
					<img class="item h28w28" />
					<img class="item h28w28" />
					<img class="item h28w28" />
					<img class="item h28w28" />
					<img class="item h28w28" />
					<img class="item h28w28" />
					<img class="accessory h28w28" />
				</div>
				<div class="flex-center-center">
					<div class="controlward">
						<img
							src="/img/controlWard.png"
							style="width: 16px; height: 16px; border-radius: 50%"
							alt=""
							srcset=""
						/>
						<div style="margin: 0 4px">제어와드</div>
						<span>4</span>
					</div>
				</div>
				<div class="flex">
					<div class="blueteams">
						<div class="blueteam flex">
							<img src="" class="champImg h14w14" />
							<div class="blue-summoner-1"></div>
						</div>
						<div class="blueteam flex">
							<img src="" class="champImg h14w14" />
							<div class="blue-summoner-2"></div>
						</div>
						<div class="blueteam flex">
							<img src="" class="champImg h14w14" />
							<div class="blue-summoner-3"></div>
						</div>
						<div class="blueteam flex">
							<img
								src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"
								class="champImg h14w14"
							/>
							<div class="blue-summoner-4"></div>
						</div>
						<div class="blueteam flex">
							<img
								src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"
								class="champImg h14w14"
							/>
							<div class="blue-summoner-5">입도열지마도구주제</div>
						</div>
					</div>
					<div class="redteams">
						<div class="redteam flex">
							<img src="" class="champImg h14w14" />
							<div class="blue-summoner-1"></div>
						</div>
						<div class="redteam flex">
							<img src="" class="champImg h14w14" />
							<div class="blue-summoner-2"></div>
						</div>
						<div class="redteam flex">
							<img src="" class="champImg h14w14" />
							<div class="blue-summoner-3"></div>
						</div>
						<div class="redteam flex">
							<img src="" class="champImg h14w14" />
							<div class="blue-summoner-4"></div>
						</div>
						<div class="redteam flex">
							<img
								src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"
								class="champImg h14w14"
							/>
							<div class="blue-summoner-5">입도열지마도구주제</div>
						</div>
					</div>
				</div>
			</div>
			<div class="box-space-between pd-1 topborder">
				<div class="wincolorline"></div>
				<div class="game-winlose-playtime flex-center-center-column">
					<div class="winlose">승리</div>
					<div class="playtime">15분 14초</div>
				</div>
				<div class="pick-champ-img h40w40">
					<img
						src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"
						alt=""
					/>
				</div>
				<div class="flex-center-center-column game-spells">
					<img class="spell h28w28" />
					<img class="spell h28w28" />
				</div>
				<div class="flex-center-center-column game-runes">
					<img
						class="rune h28w28"
						src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"
					/>
					<img
						class="rune h28w28"
						src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png"
					/>
				</div>
				<div class="flex-center-center-column game-kda">
					<div>
						<span class="game-kill">1</span> /
						<span class="game-die">2</span> /
						<span class="game-assist">2</span>
					</div>
					<span class="game-kda-rate">0.80:1 평점</span>
				</div>
				<div
					class="flex-center-center-column game-level-cs-killInvolvement"
				>
					<span class="game-level">레벨 16</span>
					<span class="game-cs">253(8.1)CS</span>
					<span class="game-killInvolvement">킬관여 45%</span>
				</div>
				<div class="flex-center-center game-items">
					<img class="item h28w28" />
					<img class="item h28w28" />
					<img class="item h28w28" />
					<img class="item h28w28" />
					<img class="item h28w28" />
					<img class="item h28w28" />
					<img class="accessory h28w28" />
				</div>
				<div class="flex-center-center">
					<div class="controlward">
						<img
							src="/img/controlWard.png"
							style="width: 16px; height: 16px; border-radius: 50%"
							alt=""
							srcset=""
						/>
						<div style="margin: 0 4px">제어와드</div>
						<span>4</span>
					</div>
				</div>
				<div class="flex">
					<div class="blueteams">
						<div class="blueteam flex">
							<img src="" class="champImg h14w14" />
							<div class="blue-summoner-1"></div>
						</div>
						<div class="blueteam flex">
							<img src="" class="champImg h14w14" />
							<div class="blue-summoner-2"></div>
						</div>
						<div class="blueteam flex">
							<img src="" class="champImg h14w14" />
							<div class="blue-summoner-3"></div>
						</div>
						<div class="blueteam flex">
							<img
								src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"
								class="champImg h14w14"
							/>
							<div class="blue-summoner-4"></div>
						</div>
						<div class="blueteam flex">
							<img
								src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"
								class="champImg h14w14"
							/>
							<div class="blue-summoner-5">입도열지마도구주제</div>
						</div>
					</div>
					<div class="redteams">
						<div class="redteam flex">
							<img src="" class="champImg h14w14" />
							<div class="blue-summoner-1"></div>
						</div>
						<div class="redteam flex">
							<img src="" class="champImg h14w14" />
							<div class="blue-summoner-2"></div>
						</div>
						<div class="redteam flex">
							<img src="" class="champImg h14w14" />
							<div class="blue-summoner-3"></div>
						</div>
						<div class="redteam flex">
							<img src="" class="champImg h14w14" />
							<div class="blue-summoner-4"></div>
						</div>
						<div class="redteam flex">
							<img
								src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"
								class="champImg h14w14"
							/>
							<div class="blue-summoner-5">입도열지마도구주제</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>`;
	pvplogbox.innerHTML = main;
	PutIcons(userdata.tier);
};

const PutIcons = (tier) => {
	const ProfileIconimg = document.querySelector('.profile-icon');
	const ProfileTierIcon = document.querySelector('.profile-tier-icon');

	const TopIcon = document.querySelector('.top-icon');
	const AdIcon = document.querySelector('.ad-icon');
	const MidIcon = document.querySelector('.mid-icon');
	const JungleIcon = document.querySelector('.jungle-icon');
	const SupporterIcon = document.querySelector('.sup-icon');
	ProfileIconimg.src =
		'https://opgg-static.akamaized.net/images/profile_icons/profileIcon6.jpg?image=q_auto&image=q_auto,f_webp,w_auto&v=1655280878465';
	switch (tier) {
		case 'IRON':
			ProfileTierIcon.src = '/ranked-emblems/Emblem_Iron.png';
			break;
		case 'BRONZE':
			ProfileTierIcon.src = '/ranked-emblems/Emblem_Bronze.png';
			break;
		case 'SILVER':
			ProfileTierIcon.src = '/ranked-emblems/Emblem_Silver.png';
			break;
		case 'GOLD':
			ProfileTierIcon.src = '/ranked-emblems/Emblem_Gold.png';
			break;
		case 'PLATINUM':
			ProfileTierIcon.src = '/ranked-emblems/Emblem_Platinum.png';
			break;
		case 'DIAMOND':
			ProfileTierIcon.src = '/ranked-emblems/Emblem_Diamond.png';
			break;
		case 'GRANDMASTER':
			ProfileTierIcon.src = '/ranked-emblems/Emblem_Grandmaster.png';
			break;
		case 'MASTER':
			ProfileTierIcon.src = '/ranked-emblems/Emblem_Master.png';
			break;
		case 'CHALLENGER':
			ProfileTierIcon.src = '/ranked-emblems/Emblem_Challenger.png';
			break;
	}

	TopIcon.src = '/img/탑.png';
	AdIcon.src = '/img/원딜.png';
	MidIcon.src = '/img/미드.png';
	JungleIcon.src = '/img/정글.png';
	SupporterIcon.src = '/img/서폿.png';
};
PvPLog(userdata);
