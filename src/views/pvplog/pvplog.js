// import * as Api from '/api.js';
// import { validateEmail } from '/useful-functions.js';
const PvPLogBox = document.querySelector('.P');
const ProfileIconimg = document.querySelector('.profile-icon');
const ProfileTierIcon = document.querySelector('.profile-tier-icon');
const RankIcon = document.querySelector('.Rank-icon');
const TopIcon = document.querySelector('.top-icon');
const AdIcon = document.querySelector('.ad-icon');
const MidIcon = document.querySelector('.mid-icon');
const JungleIcon = document.querySelector('.jungle-icon');
const SupporterIcon = document.querySelector('.supporter-icon');

const loading = async () => {
	const id = location.pathname.replace(/\/pvplog\/([\d\w]*)\/?/g, '$1');
	const res = await fetch(`/api/pvplog/${id}`);
	const UserData = await res.json();
};

const PvPLog = () => {
	const main = `
	<div class="row">
				<div class="col">
					<div class="item-name">
						<div class="icon-level-box">
							<img class="profile-icon" />
							<div class="profile-level">574</div>
						</div>
						<div class="name-renewal-box">
							<div class="profile-name">Hide On push</div>
							<div class="profile-ranking">래더 랭킹 163위</div>
							<button class="btn btn-renewal">전적갱신</button>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="item-box">
						<div class="solo-rank-inf-box">
							<div class="icon-tier-box">
								<img class="profile-tier-icon" />
							</div>
							<div class="rank-inf-box">
								<div class="profile-currunt-ranking fs-14">S2022 솔로랭크</div>
								<span class="profile-tier-name fs-24 font-inter-bold"
									>CHALLENGER</span
								>
								<span class="profile-tier-level fs-24 font-inter-bold">I</span>
								<div class="profile-league-point fs-14">
									리그 포인트 : 919LP
								</div>
								<span class="profile-win-rate fs-14">승률 :</span>
								<span class="profile-win-rate-number fs-14">53.33%</span>
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="item-box">
						<div class="box-space-evenly">
							<!--  -->
							<div class="rank-box">
								<div class="elice-rank-name-box">
									엘리스 랭킹
									<img class="elice-icon" src="../img/elice-Crown.png" alt="" />
								</div>
								<div class="elice-tier-ranking fs-48">1위</div>
							</div>
							<div class="rank-box">
								<div>
									엘리스 플탐
									<img class="elice-icon" src="../img/elice-Crown.png" alt="" />
								</div>
								<div class="elice-playtime-ranking fs-48">1위</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="row">
				<div class="col margin-lr-10">
					<div class="contentsbox">
						<div class="fs-20 color-gary pb-3">
							엘리스 트랙 기간 중 플레이 타임
						</div>
						<div class="box-space-between">
							<div class="bg-color-gray time-contents">
								<div class="fs-40">12</div>
								<div class="fs-24 mt-auto">일</div>
							</div>
							<div class="bg-color-gray time-contents">
								<div class="fs-40">290</div>
								<div class="fs-24 mt-auto">시간</div>
							</div>
							<div class="bg-color-gray time-contents">
								<div class="fs-40">17,433</div>
								<div class="fs-24 mt-auto">분</div>
							</div>
						</div>
						<hr />
						<div class="fs-20 color-gary pb-3">롤을 안 했더라면...</div>
						<div class="box-space-between">
							<div class="bg-color-gray time-contents">
								<div class="fs-40">12</div>
								<div class="fs-24 mt-auto">일</div>
							</div>
							<div class="bg-color-gray time-contents">
								<div class="fs-40">290</div>
								<div class="fs-24 mt-auto">시간</div>
							</div>
							<div class="bg-color-gray time-contents">
								<div class="fs-40">17,433</div>
								<div class="fs-24 mt-auto">분</div>
							</div>
						</div>
						<div class="box-space-between mobile-padding-top">
							<div class="bg-color-gray time-contents">
								<div class="fs-40 display-inline">12</div>
								<div class="fs-24 mt-auto display-inline">일</div>
							</div>
							<div class="bg-color-gray time-contents">
								<div class="fs-40">290</div>
								<div class="fs-24 mt-auto">시간</div>
							</div>
							<div class="bg-color-gray time-contents">
								<div class="fs-40">17,433</div>
								<div class="fs-24 mt-auto">분</div>
							</div>
						</div>
					</div>
					<div></div>
				</div>

				<div class="col margin-lr-10">
					<div class="contentsbox">
						<div class="fs-20">선호 포지션(랭크)</div>
						<div class="box-space-between"></div>
					</div>
					<div></div>
				</div>
			</div>`;
};

PvPLog();

PutIcons = () => {
	ProfileIconimg.src =
		'https://opgg-static.akamaized.net/images/profile_icons/profileIcon6.jpg?image=q_auto&image=q_auto,f_webp,w_auto&v=1655280878465';
	ProfileTierIcon.src =
		'https://support-leagueoflegends.riotgames.com/hc/article_attachments/4415894930323/Challenger_Emblem_2022.png';
	RankIcon.src = 'https://cdn-icons-png.flaticon.com/512/983/983763.png';
	TopIcon.src =
		'https://static-cdn.jtvnw.net/jtv_user_pictures/a8f06692-a07d-4902-9330-25d6abc23ad0-profile_image-300x300.png';
	AdIcon.src = 'https://namu.wiki/w/역체탑';
	MidIcon.src = 'https://leaguephd.com/static/img/lanes/mid.59083eeab24c.webp';
	JungleIcon.src =
		'https://ww.namu.la/s/305ed8a606058e624a75b072b443973b7282faed5926447c6d3d6d465d14b1f428be251d3158b1d5bbd388dbd394eae6f2a00cbf32d7b5407b4e80fdcd1d18dfe2bd0cd93d40b65e66b12857abc6ec1c';
	SupporterIcon.src =
		'https://obj-sg.thewiki.kr/data/eba1a4ec9584ec9db4ecbd982ded8faceca780ec85982dec849ced8faced84b02e706e67.png';
};

PutIcons();
