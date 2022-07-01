import * as Api from '/api.js';
import { getUserData } from '/utils/user.js';

const { summonerName } = getUserData();

//db에서 가져온 소환사 이름(미설정)
//db에서 가져온 내전 시간(미설정)
const loadingrenewal = `
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
`;
const xbox = (summonerName) =>
	`<span><button class='cancel-btn' id=${summonerName}>✕</button></span>`;

const url = location.pathname.replace(/\/scrimDetail\/([\d\w]*)\/?/g, '$1');
const scrimId = decodeURI(url).replace('/', '');
const testId = '62bddbc7d35c503f4c3aa481';
// 치환기
const $id = (selector) => {
	return document.querySelector(`#${selector}`);
};
const $ = (selector) => {
	return document.querySelector(`.${selector}`);
};

// 요일구하기
const getWeek = (strsDate) => {
	const weekName = new Array('일', '월', '화', '수', '목', '금', '토');
	var dayOfWeek = weekName[new Date(strsDate).getDay()];

	return dayOfWeek;
};

const 날짜치환 = (matchtime) => {
	const day = matchtime.split('-');
	const month = day[1];
	const date = day[2];
	return { month, date };
};

// data 가져오기
const getscrimData = async (scrimId) => {
	const data = await Api.get(`/api/scrimDetail/${scrimId}`);
	return data;
};
//추가 함수
const signupscrim = async (scrimId, summonerName, selectedPosition) => {
	const data = {
		scrimId,
		summonerName,
		selectedPosition,
	};

	try {
		const renewaldata = await Api.patch('/api/addScrimDetail', '', data);
	} catch (e) {
		console.log(e);
	}
	location.reload();
};
//취소 함수
const cancelscrim = async (scrimId, selectedPosition) => {
	const data = { scrimId, selectedPosition };
	try {
		const canceleddata = await Api.patch('/api/cancelScrimDetail', '', data);
	} catch (e) {
		console.log(e);
	}
	location.reload();
};
// 삭제 함수
const deletescrim = async (scrimId, summonerName, writerSummonerName) => {
	try {
		const objects = { scrimId: scrimId };
		const canceleddata = await Api.delete('/api/scrim', '', objects);
	} catch (e) {
		console.log(e);
	}
	location.pathname = '/scrim/';
};
// writer 표시 삭제버튼 안보이게 하기
const 누가언제몇시내전 = async (
	matchDate,
	matchTime,
	writerSummonerName,
	summonerName,
) => {
	$id('writerSummonerName').insertAdjacentHTML('beforeend', writerSummonerName);
	const { month, date } = 날짜치환(matchDate);
	const day = getWeek(matchDate);
	$id('matchTime').innerHTML = `${month}월 ${date}일(${day}) ${matchTime}`;
	if (writerSummonerName === summonerName) {
		$id('delete-btn').style = 'display:block;';
	}
};

//초기 data를 화면 구현 함수 해주는
const renderData = async (scrimId) => {
	try {
		const data = await getscrimData(scrimId);
		const { matchDate, matchTime, writerSummonerName } = data.scrimId;
		누가언제몇시내전(matchDate, matchTime, writerSummonerName, summonerName);
		삭제버튼이벤트(scrimId, summonerName, writerSummonerName);

		console.log(getWeek(matchDate));
		const {
			team1TOP,
			team1JUNGLE,
			team1MIDDLE,
			team1BOTTOM,
			team1UTILITY,
			team2TOP,
			team2JUNGLE,
			team2MIDDLE,
			team2BOTTOM,
			team2UTILITY,
		} = data;
		const userArr = Object.entries({
			team1TOP,
			team1JUNGLE,
			team1MIDDLE,
			team1BOTTOM,
			team1UTILITY,
			team2TOP,
			team2JUNGLE,
			team2MIDDLE,
			team2BOTTOM,
			team2UTILITY,
		});
		const userName = Object.values({
			team1TOP,
			team1JUNGLE,
			team1MIDDLE,
			team1BOTTOM,
			team1UTILITY,
			team2TOP,
			team2JUNGLE,
			team2MIDDLE,
			team2BOTTOM,
			team2UTILITY,
		});
		if (userName.find((name) => name === summonerName)) {
			console.log('이미 신청했던 소환사입니다.');
			for (let i = 0; i < userArr.length; i++) {
				if (userArr[i][1]) {
					$id(userArr[i][0]).innerHTML = userArr[i][1];
					$id(userArr[i][0]).classList.remove('recruit');
					if (userArr[i][1] === summonerName) {
						// 취소버튼 추가
						let selectedPosition = userArr[i][0];
						$id(userArr[i][0]).insertAdjacentHTML(
							'beforebegin',
							xbox(summonerName),
						);
						취소버튼(summonerName, scrimId, selectedPosition),
							($id(userArr[i][0]).style = 'width:250px');
					}
				} else {
					$id(userArr[i][0]).innerHTML = '신청하기';
				}
			}
		} else {
			for (let i = 0; i < userArr.length; i++) {
				if (userArr[i][1]) {
					$id(userArr[i][0]).innerHTML = userArr[i][1];
					$id(userArr[i][0]).classList.remove('recruit');
				} else {
					$id(userArr[i][0]).innerHTML = '신청하기';
					let Linebnt = $id(userArr[i][0]);
					let selectedPosition = userArr[i][0];
					신청버튼(Linebnt, scrimId, summonerName, selectedPosition);
				}
			}
		}
	} catch (e) {
		console.log(e);
	}
};
// 수정좀 testId => scrimId
renderData(scrimId);
//
const 신청버튼 = (Linebnt, scrimId, summonerName, selectedPosition) => {
	Linebnt.addEventListener('click', async (e) => {
		e.preventDefault();
		await signupscrim(scrimId, summonerName, selectedPosition);
	});
};

const 삭제버튼이벤트 = (scrimId, summonerName, writerSummonerName) => {
	$id('delete-btn').addEventListener('click', (e) => {
		e.preventDefault();
		deletescrim(scrimId, summonerName, writerSummonerName);
	});
};
const 취소버튼 = (summonerName, scrimId, selectedPosition) => {
	$id(`${summonerName}`).addEventListener('click', (e) => {
		e.preventDefault();
		cancelscrim(scrimId, selectedPosition);
	});
};

//
// 신청하기 클릭시 로그인 된 소환사 이름 입력
// const sumonnerNameAttach = () => {
// 	const binRecruit = document.getElementById('scrim-member recruit');
// 	items.forEach((binRecruit) => {
// 		item.addEventListener('click', function () {
// 			const sumomonerName = this.getAttribute('data-summoner-name'); // 랜더링 될 때 설정해주기(미설정)
// 			binRecruit.innerHTML = '${summonerName}'; //db에서 가져온 소환사 이름(미설정)
// 			binRecruit.className = 'recruit-name';
// 		});
// 	});
// };
// sumonnerNameAttach();

// // 각 라인에 소환사 이름 입력 랜더링

// // 아이디 버튼 누르면 전적 검색 페이지 이동
// const attachEvent = () => {
// 	const items = document.querySelector('.scrim-member lane');
// 	items.forEach((item) => {
// 		item.addEventListener('click', function () {
// 			const sumomonerName = this.getAttribute('data-summoner-name'); // 랜더링 될 때 설정해주기(미설정)
// 			window.location.href = `/pvplog/${sumomonerName}`;
// 		});
// 	});
// };

// // 로그인 된 소환사 이름과 내전 모집을 한 소환사 이름이 같을 때 내전 삭제 버튼 표시
// const data = await Api.get(
// 	`/api/users/${localStorage.getItem('summonerName')}`,
// );
// const style = document.createElement('style');
// if (data != this.sumomonerName) {
// 	// 랜더링 될 때 설정해주기(미설정)
// 	style.innerHTML = `
//     .scrim-member base-del {
//         display: none;
//       }
//     `;
// 	document.head.appendChild(style);
// }

// attachEvent();

// //내전 삭제 버튼 클릭 이벤트
// const scrimDelBtn = document.querySelector('.scrim-member base-del');
// scrimDelBtn.addEventListener('click', btnClickEvent);
// async function btnClickEvent(e) {
// 	const btnDelete = e.target.closest('.scrim-member base-del');

// 	if (btnDelete) {
// 		if (confirm('정말 삭제하시겠습니까??') == true) {
// 			const targetId = btnDelete.name;
// 			console.log(targetId);
// 			const res = await Api.delete('/api/scrim', '', { targetId }); //api 추가해주기(미설정)

// 			location.reload();
// 		} else {
// 			return false;
// 		}
// 	}
// }
