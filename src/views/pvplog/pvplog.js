import * as Api from '/api.js';
import { getUserData } from '/utils/user.js';
const ProfileIconimg = document.querySelector('.profile-icon');
const ProfileTierIcon = document.querySelector('.profile-tier-icon');
getUserData();
const TopIcon = document.querySelector('.top-icon');
const AdIcon = document.querySelector('.ad-icon');
const MidIcon = document.querySelector('.mid-icon');
const JungleIcon = document.querySelector('.jungle-icon');
const SupporterIcon = document.querySelector('.sup-icon');

const pvplogRenewalBtn = document.querySelector('#pvplogRenewal');

// 선호 포지션
const preferlinerate = document.getElementsByClassName('line-pick-rate');

const addEvent = () => {
	pvplogRenewalBtn.addEventListener('click', loading);
};
const loading = async () => {
	const id = location.pathname.replace(/\/pvplog\/([\d\w]*)\/?/g, '$1');
	const password = '12345';
	const name = '룰루랄라';
	const summonerName = 'JUGKlNG';
	const data = { id, password, name, summonerName };
	const result = await Api.patch(`/api/users/${id}`);
	console.log(result);
	const UserData = await result.json();
	console.log(UserData);
};
const getLogintoken = async () => {
	const id = location.pathname.replace(/\/pvplog\/([\d\w]*)\/?/g, '$1');
	const data = {
		id,
		password: '12345',
	};
	const result = await Api.post('/api/login', data);
	localStorage.setItem('token', result.token);
	console.log(result.token);
};
getLogintoken();
addEvent();
const PvPLog = () => {
	const main = `
	<div class="row">
				<div class="col">
					<div class="item-name">
						<div class="icon-level-box">
							<img class="profile-icon" />
							<div class="profile-level">${profileLevel}</div>
						</div>
						<div class="name-renewal-box">
							<div class="profile-name">${profileSummonerName}</div>
							<div class="profile-ranking">래더 랭킹 ${profileRanking}위</div>
							<button class="btn btn-renewal" id="pvplogRenewal">
								전적갱신
							</button>
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
										>${profileTierName}
										<span class="profile-tier-level fs-24 font-inter-bold"
											>${profileTierLevel}</span
										></span
									>

									<div class="profile-league-point fs-14">
										리그 포인트 : ${profileTierPoint}
									</div>
									<span class="profile-win-rate fs-14">승률 :</span>
									<span class="profile-win-rate-number fs-14">${profileWinRate}%</span>
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
								<div class="current-20game-winrate">${crruent20gameWinrate}</div>
								<div class="box-space-evenly" style="margin-top: 20px">
									<div
										class="pie-chart2"
										style="
											display: inline-block;
											position: relative;
											width: 110px;
											height: 110px;
											background: conic-gradient(
												#4990e2 0% 70%,
												#fa576f 70% 100%
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
											"
										></span>
									</div>
									<div class="current-20game-winrate">
										<div class="current-20game-kda">${current20gameKda}</div>
										<div class="current-20game-kdarate">${current20gameKdaRate}</div></div>
										<div class="current-20game-killInvolvement">킬관여 51%</div> 									 	<!-- 킬관여 계산해서 넣기 -->
									</div>
								</div>
							</div>

							<div class="col">
								플래이한 챔피언
								<div class="box-space-evenly" style="margin-top: 10px">
									<img class="champ h45w45  border-circle" src="/img/미드.png" />  	<!-- 챔프 URL -->
									<div class="champ-win-rate">80%</div>   <!-- 챔프 승률 -->
									<div class="champ-play-games">(5게임)</div>   <!-- 챔프 플레이 횟수-->
									<div class="champ-kda-rate">3.99:1평점</div>  <!-- 챔프 평점-->
								</div>

								<div class="box-space-evenly">
									<img
										class="champ h45w45 border-circle"
										src="/img/미드.png"  
									/>
									<div class="champ-win-rate">80%</div>
									<div class="champ-play-games">(5게임)</div>
									<div class="champ-kda-rate">3.99:1평점</div>
								</div>
								<div class="box-space-evenly">
									<img
										class="champ h45w45 border-circle"
										src="/img/미드.png"
									/>
									<div class="champ-win-rate">80%</div>
									<div class="champ-play-games">(5게임)</div>
									<div class="champ-kda-rate">3.99:1평점</div>
								</div>
							</div>

							<div class="col">
								선호 포지션
								<div class="box-space-evenly" style="margin-top: 20px">
									<div class="line-rate">
										<div class="line-pick">
											<div class="line-pick-rate" style="height: 80%"></div>
										</div>

										<img class="top-icon" src="/img/탑.png" />
									</div>
									<div class="line-rate">
										<div class="line-pick">
											<div class="line-pick-rate"></div>
										</div>
										<img class="jungle-icon" src="/img/정글.png" />
									</div>
									<div class="line-rate">
										<div class="line-pick">
											<div class="line-pick-rate"></div>
										</div>
										<img class="mid-icon" src="/img/미드.png" />
									</div>
									<div class="line-rate">
										<div class="line-pick">
											<div class="line-pick-rate"></div>
										</div>
										<img class="ad-icon" src="/img/원딜.png" />
									</div>
									<div class="line-rate">
										<div class="line-pick">
											<div class="line-pick-rate"></div>
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
};

// PvPLog();

const PutIcons = () => {
	ProfileIconimg.src =
		'https://opgg-static.akamaized.net/images/profile_icons/profileIcon6.jpg?image=q_auto&image=q_auto,f_webp,w_auto&v=1655280878465';

	ProfileTierIcon.src = '/ranked-emblems/Emblem_Challenger.png';

	TopIcon.src = '/img/탑.png';
	AdIcon.src = '/img/원딜.png';
	MidIcon.src = '/img/미드.png';
	JungleIcon.src = '/img/정글.png';
	SupporterIcon.src = '/img/서폿.png';
	//포지션 반영
	for (let i = 0; i < preferlinerate.length; i++) {
		preferlinerate[i].style = `height: ${100 + i * -20}%`;
	}
};

PutIcons();
