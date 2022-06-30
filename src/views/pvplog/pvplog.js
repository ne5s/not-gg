import * as Api from '/api.js';
import { getUserData } from '/utils/user.js';
import { wait, timeForToday } from '/useful-functions.js';

//전적갱신 버튼 태그

// 선호 포지션
const preferlinerate = document.getElementsByClassName('line-pick-rate');

const addEvent = (btn) => {
	btn.addEventListener('click', pvpdatapatch);
};
//reload
const reload = () => {
	location.reload();
};

// 대기 메시지
const waitapi = `
	<div class='waitapi'>
		<div>호출량이 많아 갱신이 어렵습니다. 2분 뒤 다시 시도바랍니다.</div>
	</div>
`;
const loadingrenewal = `
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
`;

const nodata = (id) => `
<div class='waitapi'>
<div> 2022 솔랭 정보가 없습니다. ${id}님 솔랭 한판 해주시길 바랍니다. </div>
</div>
`;

//전적 갱신 버튼
const pvpdatapatch = async () => {
	const url = location.pathname.replace(/\/pvplog\/([\d\w]*)\/?/g, '$1');
	const id = decodeURI(url).replace('/', '');

	const data = { summonerName: id };
	const navbar = document.querySelector('.navbar');
	const pvplogRenewalBtn = document.querySelector('#pvplogRenewal');
	try {
		pvplogRenewalBtn.innerHTML = '';
		pvplogRenewalBtn.disabled = true;
		pvplogRenewalBtn.insertAdjacentHTML('afterbegin', loadingrenewal);
		await Api.patch('/api/users', '', data).then((res) => {
			console.log(res);
			if (res) {
				reload();
			}
		});
		const wait = document.querySelector('.waitapi');
		if (wait) {
			document.body.removeChild(wait);
		}
		pvplogRenewalBtn.disabled = false;
		pvplogRenewalBtn.innerHTML = '전적갱신';
	} catch (e) {
		console.log(e);
		const wait = document.querySelector('.waitapi');
		if (wait) {
			document.body.removeChild(wait);
		}
		pvplogRenewalBtn.disabled = false;
		pvplogRenewalBtn.innerHTML = '전적갱신';
		navbar.insertAdjacentHTML('afterend', waitapi);
	}
};

// 20게임  데이터 추출
const getLogintoken = async () => {
	const url = location.pathname.replace(/\/pvplog\/([\d\w]*)\/?/g, '$1');
	const id = decodeURI(url).replace('/', '');
	console.log(id);
	// user, match, soloRank data
	try {
		const data3 = await Api.get(`/api/search/${id}`);
		//	엘리스 순위 등록을 위한 get
		const data2 = await Api.get(`/api/soloRanking`);
		const elicerank = data2.findIndex((res) => res.summonerName === id) + 1;
		console.log(data3);
		// 데이터 정리
		const { summonerName, summonerLevel, profileIconURL } = data3.user;
		const matches = data3.match;
		const {
			leaguePoints,
			matchFor20Games,
			playLineFor20Games,
			rank,
			sortedPlayChampsFor20Games,
			tier,
			updatedAt,
			winRate,
		} = data3.soloRank;

		return {
			leaguePoints,
			matchFor20Games,
			playLineFor20Games,
			summonerLevel,
			rank,
			sortedPlayChampsFor20Games,
			tier,
			updatedAt,
			winRate,
			summonerName,
			elicerank,
			matches,
			profileIconURL,
		};
	} catch (e) {
		console.log(e);
		document.body.insertAdjacentHTML('beforeend', nodata(id));
	}
};

//데이터 추출
const userdata = await getLogintoken();

// 화면 구현 함수();
const putPvPLog = (userdata) => {
	console.log(userdata);

	const {
		leaguePoints,
		matchFor20Games,
		playLineFor20Games,
		rank,
		sortedPlayChampsFor20Games,
		tier,
		updatedAt,
		summonerLevel,
		winRate,
		summonerName,
		elicerank,
		matches,
		profileIconURL,
	} = userdata;
	const playgamestate = Object.values(playLineFor20Games).reduce(
		(a, b) => a + b,
	);
	// 챔프 모스트 3개
	const most3champdata = [];
	for (let i = 0; i < 3; i++) {
		console.log(sortedPlayChampsFor20Games[i]);
		if (sortedPlayChampsFor20Games[i]) {
			let a = `<div class="box-space-evenly" style="margin-top: 10px">
						<img
							class="champ h40w40 border-circle"
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
						].kda.toFixed(1)}:1 평점</div>
					</div>`;
			most3champdata.push(a);
		}
	}
	// 최근 20게임 데이터
	let current20games = [];
	for (let j = 0; j < matches.length; j++) {
		if (matches[j]) {
			let playedAt = timeForToday(matches[0].gameEndTimestamp);
			let gameSimply = matches[j].gameSimply;
			let userimg =
				Object.values(gameSimply).findIndex((res) => res === summonerName) / 2 +
				1;
			let userInf = matches[j][`user${userimg}`];

			let userteam = 'blue';
			let teamwinlose = false;
			if (userimg > 5) {
				userteam = 'red';
				if (matches[j].win === userteam) {
					teamwinlose = true;
				}
			} else {
				if (matches[j].win === userteam) {
					teamwinlose = true;
				}
			}

			let gamebox = `
			<div class="box-space-between pd-1 topborder" style='color: #555e5e'>
				<div class=${teamwinlose ? 'wincolorline' : 'losecolorline'}></div>
				<div class="game-winlose-playtime flex-center-center-column">
				<div class='soloranktext ${
					teamwinlose ? 'color-win' : 'color-lose'
				}' >솔랭</div>
				<div class="updatetimeAt soloranktext">${playedAt}</div>
					<div class="winlose soloranktext2 ${
						teamwinlose ? 'color-win' : 'color-lose'
					}">${teamwinlose ? '승리' : '패배'}</div>
					<div class="playtime soloranktext2">${matches[j].gameDuration}</div>
					
				</div>
				<div class="pick-champ-img h40w40">
					<img
						class='h40w40'
						src="${gameSimply[`user${userimg}Image`]}"
						alt=""
					/>
				</div>
				<div style='display:flex;'>				
					<div class="flex-center-center-column game-spells">
						<img class="spell h28w28" src=${userInf.spell1} />
						<img class="spell h28w28" src=${userInf.spell2} />
					</div>
					<div class="flex-center-center-column game-runes" style='margin-left:4px;'>
						<img class="rune h28w28" src=${userInf.primaryStyle} />
						<img class="rune h28w28" src=${userInf.subStyle} />
					</div>
				</div>
				<div class="flex-center-center-column game-kda">
					<div>
						<span class="game-kill " >${userInf.kills} /</span> 
						<span class="game-die" style='color:#C6443E'>${userInf.deaths} </span> 
						<span class="game-assist" >/ ${userInf.assists}</span>
					</div>
					<span class="game-kda-rate" >${userInf.kda}:1 평점</span>
				</div>
				<div
					class="flex-center-center-column game-level-cs-killInvolvement"
				>
					<span class="game-level" >레벨 ${userInf.champLevel}</span>
					<span class="game-cs" >${userInf.cs}(${userInf.csByMinute})CS</span>
					<span class="game-killInvolvement" style='color:#C6443E'>킬관여 ${
						userInf.killParticipation
					}%</span>
				</div>
				<div class="flex-center-center game-items ">
					<img class="item h28w28" src=${
						userInf.item0
							? userInf.item0
							: 'https://thumb.photo-ac.com/50/5000224d5e1b9e40199bc53e1104d7ee_t.jpeg'
					} />
					<img class="item h28w28" src=${
						userInf.item1
							? userInf.item1
							: 'https://thumb.photo-ac.com/50/5000224d5e1b9e40199bc53e1104d7ee_t.jpeg'
					} />
					<img class="item h28w28" src=${
						userInf.item2
							? userInf.item2
							: 'https://thumb.photo-ac.com/50/5000224d5e1b9e40199bc53e1104d7ee_t.jpeg'
					} />
					<img class="item h28w28" src=${
						userInf.item3
							? userInf.item3
							: 'https://thumb.photo-ac.com/50/5000224d5e1b9e40199bc53e1104d7ee_t.jpeg'
					} />
					<img class="item h28w28" src=${
						userInf.item4
							? userInf.item4
							: 'https://thumb.photo-ac.com/50/5000224d5e1b9e40199bc53e1104d7ee_t.jpeg'
					} />
					<img class="item h28w28" src=${
						userInf.item5
							? userInf.item5
							: 'https://thumb.photo-ac.com/50/5000224d5e1b9e40199bc53e1104d7ee_t.jpeg'
					} />
					<img class="accessory h28w28 mobile-none " src=${
						userInf.item6
							? userInf.item6
							: 'https://thumb.photo-ac.com/50/5000224d5e1b9e40199bc53e1104d7ee_t.jpeg'
					} />
				</div>
				<div class="flex-center-center visionWardsBoughtInGame">
					<div class="controlward">
						<img
							src="/img/controlWard.png"
							style="width: 16px; height: 16px; border-radius: 50%"
							alt=""
							srcset=""
						/>
						<div style="margin: 0 4px">제어와드</div>
						<span>${userInf.visionWardsBoughtInGame}</span>
					</div>
				</div>
				<div class="flex">
					<div class="blueteams">
						<div class="blueteam flex">
							<img src=${gameSimply.user1Image} class="champImg h14w14" />
							<div class="blue-summoner-1 text-ellipsis" ${
								userimg === 1 ? "style = 'color:black; font-weight: bold;'" : ''
							} >${gameSimply.user1Id}</div>
						</div>
						<div class="blueteam flex">
							<img src=${gameSimply.user2Image} class="champImg h14w14" />
							<div class="blue-summoner-2 text-ellipsis" ${
								userimg === 2 ? "style = 'color:black; font-weight: bold;'" : ''
							}>${gameSimply.user2Id}</div>
						</div>
						<div class="blueteam flex">
							<img src=${gameSimply.user3Image} class="champImg h14w14" />
							<div class="blue-summoner-3 text-ellipsis" ${
								userimg === 3 ? "style = 'color:black; font-weight: bold;'" : ''
							}>${gameSimply.user3Id}</div>
						</div>
						<div class="blueteam flex">
							<img src=${gameSimply.user4Image} class="champImg h14w14"	/>
							<div class="blue-summoner-4 text-ellipsis" ${
								userimg === 4 ? "style = 'color:black; font-weight: bold;'" : ''
							}>${gameSimply.user4Id}</div>
						</div>
						<div class="blueteam flex">
							<img src=${gameSimply.user5Image} class="champImg h14w14"	/>
							<div class="blue-summoner-5 text-ellipsis" ${
								userimg === 5 ? "style = 'color:black; font-weight: bold;'" : ''
							}>${gameSimply.user5Id}</div>
						</div>
					</div>
					<div class="redteams">
						<div class="redteam flex">
							<img src=${gameSimply.user6Image} class="champImg h14w14" />
							<div class="blue-summoner-1 text-ellipsis" ${
								userimg === 6 ? "style = 'color:black; font-weight: bold;'" : ''
							}>${gameSimply.user6Id}</div>
						</div>
						<div class="redteam flex">
							<img src=${gameSimply.user7Image} class="champImg h14w14" />
							<div class="blue-summoner-2 text-ellipsis" ${
								userimg === 7 ? "style = 'color:black; font-weight: bold;'" : ''
							}>${gameSimply.user7Id}</div>
						</div>
						<div class="redteam flex">
							<img src=${gameSimply.user8Image} class="champImg h14w14" />
							<div class="blue-summoner-3 text-ellipsis" ${
								userimg === 8 ? "style = 'color:black; font-weight: bold;'" : ''
							}>${gameSimply.user8Id}</div>
						</div>
						<div class="redteam flex">
							<img src=${gameSimply.user9Image} class="champImg h14w14" />
							<div class="blue-summoner-4 text-ellipsis" ${
								userimg === 9 ? "style = 'color:black; font-weight: bold;'" : ''
							}>${gameSimply.user9Id}</div>
						</div>
						<div class="redteam flex">
							<img src=${gameSimply.user10Image} class="champImg h14w14"/>
							<div class="blue-summoner-5 text-ellipsis" ${
								userimg === 10
									? "style = 'color:black; font-weight: bold;'"
									: ''
							}>${gameSimply.user10Id}</div>
						</div>
					</div>
				</div>
			</div>
			`;
			current20games.push(gamebox);
		}
	}

	const main = `
	<div class="container mt-5 pvplogbox">
		<div class="row">
			<div class="col">
				<div class="item-name">
					<div class="icon-level-box">
						<img class="profile-icon" src=${profileIconURL} />
						<div class="profile-level">${summonerLevel}</div>
					</div>
					<div class="name-renewal-box">
						<div class="profile-name">${summonerName}</div>
						<div class="profile-ranking">엘리스 랭킹 ${elicerank}위</div>
						<div class='renewal'>
								<button class="btn btn-renewal" id="pvplogRenewal">
								전적갱신
							</button>
					<div class='renewaltime'>${timeForToday(updatedAt)}</div></div>
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
								<span class="profile-win-rate-number fs-14">${winRate}%</span>
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
										><div>${Math.floor(matchFor20Games.winRate)}%</div></span
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
							<div class='playchamps' style='margin-left:12px'>플래이한 챔피언
							${most3champdata.join('')}</div></div>
						
						<div class="col">
							<div class='preferlines' style='margin-left:12px'>선호 포지션</div>
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
			<div class="col">
				<div class="gamelogbox">
						${current20games.join('')}
				</div>
			</div>
		</div>
	</div>
		`;
	let pvplogbox = document.querySelector('.pvplogbox');
	if (pvplogbox) {
		document.body.removeChild(pvplogbox);
	}
	document.body.insertAdjacentHTML('beforeend', main);
	PutIcons(userdata.tier);
	const pvplogRenewalBtn = document.querySelector('#pvplogRenewal');
	addEvent(pvplogRenewalBtn);
};

// 티어 이미지 반영 함수
const PutIcons = (tier) => {
	const ProfileTierIcon = document.querySelector('.profile-tier-icon');

	const TopIcon = document.querySelector('.top-icon');
	const AdIcon = document.querySelector('.ad-icon');
	const MidIcon = document.querySelector('.mid-icon');
	const JungleIcon = document.querySelector('.jungle-icon');
	const SupporterIcon = document.querySelector('.sup-icon');

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

putPvPLog(userdata);
