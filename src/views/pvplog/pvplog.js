// import * as Api from '/api.js';
// import { validateEmail } from '/useful-functions.js';

const ProfileIconimg = document.querySelector('.profile-icon');
const ProfileTierIcon = document.querySelector('.profile-tier-icon');
const RankIcon = document.querySelector('.Rank-icon');
const TopIcon = document.querySelector('.top-icon');
const AdIcon = document.querySelector('.ad-icon');
const MidIcon = document.querySelector('.mid-icon');
const JungleIcon = document.querySelector('.jungle-icon');
const SupporterIcon = document.querySelector('.supporter-icon');
const putIcon = () => {
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

putIcon();
