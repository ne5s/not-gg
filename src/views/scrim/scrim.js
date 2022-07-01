import * as Api from '/api.js';
import { getUserData } from '/utils/user.js';

//mordal js
const myModal = document.getElementById('myModal');
const myInput = document.getElementById('myInput');

// myModal.addEventListener('shown.bs.modal', () => {
// 	myInput.focus();
// });

// 로그인 된 계정 일때만 내전 모집 버튼 표시
const data = localStorage.getItem('token');
const style = document.createElement('style');
if (data === null) {
	style.innerHTML = `
      #scrim-recruit-btn {
        display: none;
      }
    `;
	document.head.appendChild(style);
}

// 날짜 정보 랜더링
const date = new Date(); //현재 날짜 정보
const year = date.getFullYear(); //년
let month = date.getMonth() + 1; //월
let day = date.getDate(); //일
if (month.toString().length === 1) {
	month = '0' + month;
}
if (day.toString().length === 1) {
	day = '0' + day;
}
const dayKo = ['일', '월', '화', '수', '목', '금', '토', '일'][date.getDay()]; //요일
const todayYYYYMMDD = year + '-' + month + '-' + day;

const yesterday = new Date(date.setDate(date.getDate() - 1)); //어제 날짜 정보
const yesterdayYear = yesterday.getFullYear(); //년
let yesterdayMonth = yesterday.getMonth() + 1; //월
let yesterdayDay = yesterday.getDate(); //일
if (yesterdayMonth.toString().length === 1) {
	yesterdayMonth = '0' + yesterdayMonth;
}
if (yesterdayDay.toString().length === 1) {
	yesterdayDay = '0' + yesterdayDay;
}
const yesterdayDayKo = ['일', '월', '화', '수', '목', '금', '토', '일'][
	yesterday.getDay()
]; //요일
const yesterdayYYYYMMDD =
	yesterdayYear + '-' + yesterdayMonth + '-' + yesterdayDay;

const tomorrow = new Date(date.setDate(date.getDate() + 2)); //내일 날짜 정보
const tomorrowYear = tomorrow.getFullYear(); //년
let tomorrowMonth = tomorrow.getMonth() + 1; //월
let tomorrowDay = tomorrow.getDate(); //일
if (tomorrowMonth.toString().length === 1) {
	tomorrowMonth = '0' + tomorrowMonth;
}
if (tomorrowDay.toString().length === 1) {
	tomorrowDay = '0' + tomorrowDay;
}
const tomorrowDayKo = ['일', '월', '화', '수', '목', '금', '토', '일'][
	tomorrow.getDay()
]; //요일
const tomorrowYYYYMMDD = tomorrowYear + '-' + tomorrowMonth + '-' + tomorrowDay;

const dayaftertomorrow = new Date(date.setDate(date.getDate() + 1)); //모레 날짜 정보
const dayaftertomorrowYear = dayaftertomorrow.getFullYear(); //년
let dayaftertomorrowMonth = dayaftertomorrow.getMonth() + 1; //월
let dayaftertomorrowDay = dayaftertomorrow.getDate(); //일
if (dayaftertomorrowMonth.toString().length === 1) {
	dayaftertomorrowMonth = '0' + dayaftertomorrowMonth;
}
if (dayaftertomorrowDay.toString().length === 1) {
	dayaftertomorrowDay = '0' + dayaftertomorrowDay;
}
const dayaftertomorrowDayKo = ['일', '월', '화', '수', '목', '금', '토', '일'][
	dayaftertomorrow.getDay()
]; //요일
const dayaftertomorrowYYYYMMDD =
	dayaftertomorrowYear +
	'-' +
	dayaftertomorrowMonth +
	'-' +
	dayaftertomorrowDay;

//요일 랜더링
const tomorrowTime = document.getElementById('tomorrowTimeset');
const dayaftertomorrowTime = document.getElementById('dayaftertomorrowTimeset');

tomorrowTime.innerHTML = `${tomorrow.getDate()}(${tomorrowDayKo})`;
dayaftertomorrowTime.innerHTML = `${dayaftertomorrow.getDate()}(${dayaftertomorrowDayKo})`;

//요일 구하는 함수
const getWeek = (strsDate) => {
	const weekName = new Array('일', '월', '화', '수', '목', '금', '토');
	var dayOfWeek = weekName[new Date(strsDate).getDay()];
	return dayOfWeek;
};

//내전 페이지 랜더링
const yesterdayMatch = document.getElementById('yesterday-match');
const todayMatch = document.getElementById('today-match');
const tomorrowMatch = document.getElementById('tomorrow-match');
const dayaftertomorrowMatch = document.getElementById('dayaftertomorrow-match');
const afterThanMatch = document.getElementById('after-than-match');

const ScrimList = await Api.get('/api/scrims');
console.log(ScrimList);
ScrimList.forEach((data) => {
	const matchDate = data.matchDate;
	const matchMonth = matchDate.substr(5, 2);
	const matchDay = matchDate.substr(8, 8);

	const matchTime = data.matchTime;
	const matchHour = matchTime.substr(0, 2);
	const matchMinute = matchTime.substr(3, 6);

	const currentApplyingNum = data.currentApplyingNum;
	const isRecruiting = data.isRecruiting;
	const writerSummonerName = data.writerSummonerName;
	const matchId = data._id;

	//모집 인원이 10명이 되면 버튼 색깔이 회색으로 변하게(테스트 못해봄)
	const btnSelector = document.querySelectorAll('.scrim-member');
	if (isRecruiting) {
		btnSelector.className = 'scrim-member close';
	}

	//날짜에 따라서 해당 영역으로 랜더링 시키기
	if (matchDate === yesterdayYYYYMMDD) {
		yesterdayMatch.innerHTML += `
		<ul>
			<li>
				<span class="components close">${writerSummonerName}</span>
				<span>님의</span>
				<span class="components close" id="scrim-date">${matchMonth}월${matchDay}일 ${matchHour}:${matchMinute}(${getWeek(
			matchDate,
		)})</span>
				<span>내전 모집이 마감되었습니다.</span>
			</li>
			<button type="submit" class="scrim-member close" scrim-id-set="${matchId}">${currentApplyingNum}/10</button>
		</ul>
	`;
	} else if (matchDate === todayYYYYMMDD) {
		todayMatch.innerHTML += `
		<ul>
			<li>
				<span class="components">${writerSummonerName}</span>
				<span>님이</span>
				<span class="components" id="scrim-date">${matchMonth}월${matchDay}일 ${matchHour}:${matchMinute}(${getWeek(
			matchDate,
		)})</span>
				<span>내전을 모집중입니다.</span>
			</li>
			<button type="submit" class="scrim-member" scrim-id-set="${matchId}">${currentApplyingNum}/10</button>
		</ul>
		`;
	} else if (matchDate === tomorrowYYYYMMDD) {
		tomorrowMatch.innerHTML += `
		<ul>
			<li>
				<span class="components">${writerSummonerName}</span>
				<span>님이</span>
				<span class="components" id="scrim-date">${matchMonth}월${matchDay}일 ${matchHour}:${matchMinute}(${getWeek(
			matchDate,
		)})</span>
				<span>내전을 모집중입니다.</span>
			</li>
			<button type="submit" class="scrim-member" scrim-id-set="${matchId}">${currentApplyingNum}/10</button>
		</ul>
		`;
	} else if (matchDate === dayaftertomorrowYYYYMMDD) {
		dayaftertomorrowMatch.innerHTML += `
		<ul>
			<li>
				<span class="components">${writerSummonerName}</span>
				<span>님이</span>
				<span class="components" id="scrim-date">${matchMonth}월${matchDay}일 ${matchHour}:${matchMinute}(${getWeek(
			matchDate,
		)})</span>
				<span>내전을 모집중입니다.</span>
			</li>
			<button type="submit" class="scrim-member" scrim-id-set="${matchId}">${currentApplyingNum}/10</button>
		</ul>
		`;
	} else if (matchDate > dayaftertomorrowYYYYMMDD) {
		afterThanMatch.innerHTML += `
		<ul>
			<li>
				<span class="components">${writerSummonerName}</span>
				<span>님이</span>
				<span class="components" id="scrim-date">${matchMonth}월${matchDay}일 ${matchHour}:${matchMinute}(${getWeek(
			matchDate,
		)})</span>
				<span>내전을 모집중입니다.</span>
			</li>
			<button type="submit" class="scrim-member" scrim-id-set="${matchId}">${currentApplyingNum}/10</button>
		</ul>
		`;
	}
});

//mordal에서 입력받은 값 db에 전달
const scrimSubmitBtn = document.getElementById('scrim-submit-btn');
async function addHandleSubmit() {
	const scrimDateSet = document.getElementById('scrim-date-set').value;
	const scrimTimeSet = document.getElementById('scrim-time-set').value;
	const myPosition = document.querySelector(
		'input[name="myPosition"]:checked',
	).id;

	let selectedPosition = myPosition.slice(10);
	const { summonerName } = getUserData();

	// 내전 등록 api 요청
	try {
		const data = {
			selectedPosition,
			matchDate: scrimDateSet,
			matchTime: scrimTimeSet,
			summonerName,
		};
		console.log(data);
		await Api.post('/api/scrim', data);
		console.log('등록성공');
		location.reload();
		// window.location.href = `/scrimDetail/${_id}`;
	} catch (err) {
		console.error(err.stack);
		alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
	}
}
scrimSubmitBtn.addEventListener('click', addHandleSubmit);

//모집 인원(N/10) 버튼 누르면 상세 페이지로 이동
const attachEvent = () => {
	const items = document.querySelectorAll('.scrim-member');
	items.forEach((item) => {
		item.addEventListener('click', function (e) {
			e.preventDefault();
			const idSelector = this.getAttribute('scrim-id-set');
			window.location.href = `/scrimDetail/${idSelector}`;
		});
	});
};
attachEvent();
