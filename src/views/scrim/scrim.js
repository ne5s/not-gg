import * as Api from '/api.js';

//mordal js
const myModal = document.getElementById('myModal');
const myInput = document.getElementById('myInput');

// myModal.addEventListener('shown.bs.modal', () => {
// 	myInput.focus();
// });
const 신청 = ({ scrimId, matchDate, matchTime, summonerName, selectedPosition }) =>{
	const data = { scrimId, matchDate, matchTime, summonerName, selectedPosition }
	const returndata = await Api.patch('/cancelScrimDetail','', data)
}
// 날짜 정보 랜더링
const date = new Date(); //현재 날짜 정보
const tomorrow = new Date(date.setDate(date.getDate() + 1)); //내일 날짜 정보
const dayaftertomorrow = new Date(date.setDate(date.getDate() + 1)); //모레 날짜 정보
const year = date.getFullYear(); //년
const month = date.getMonth() + 1; //월
const day = date.getDate(); //일
const dayKo = ['일', '월', '화', '수', '목', '금', '토', '일'][date.getDay()]; //요일
const tomorrowdayKo = ['일', '월', '화', '수', '목', '금', '토', '일'][
	tomorrow.getDay()
]; //내일 요일
const dayaftertomorrowdayKo = ['일', '월', '화', '수', '목', '금', '토', '일'][
	dayaftertomorrow.getDay()
]; //모레 요일

const tomorrowTime = document.getElementById('tomorrowTimeset');
const dayaftertomorrowTime = document.getElementById('dayaftertomorrowTimeset');

tomorrowTime.innerHTML = `${tomorrow.getDate()}(${tomorrowdayKo})`;
dayaftertomorrowTime.innerHTML = `${dayaftertomorrow.getDate()}(${dayaftertomorrowdayKo})`;

//mordal에서 입력받은 값 db에 전달

const scrimSubmitBtn = document.getElementById('scrim-submit-btn');
const scrimDateSet = document.getElementById('scrim-date-set').value;
const scrimTimeSet = document.getElementById('scrim-time-set').value;
const myPosition = document.querySelector(
	'input[name="myPosition"]:checked',
).id;

let MainPosition = myPosition.slice(10);

console.log(scrimDateSet);
console.log(scrimTimeSet);
console.log(MainPosition);

async function addHandleSubmit() {
	// 내전 등록 api 요청
	try {
		const data = { MainPosition, scrimDateSet, scrimTimeSet };
		console.log(data);
		await Api.post('/api/scrim', data);
		console.log('등록성공');

		// window.location.href = '/scrim';
	} catch (err) {
		console.error(err.stack);
		alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
	}
}

scrimSubmitBtn.addEventListener('click', addHandleSubmit);

// 아이디 버튼 누르면 전적 검색 페이지 이동

const attachEvent = () => {
	const items = document.getElementById('scrim-recruiter');
	items.forEach((item) => {
		item.addEventListener('click', function () {
			const sumomonerName = this.getAttribute('data-summoner-name'); // 랜더링 될 때 설정해주기
			window.location.href = `/pvplog/${sumomonerName}`;
		});
	});
};

attachEvent();

// 로그인 된 계정 일때만 내전 모집 버튼 표시
const data = await Api.get(
	`/api/users/${localStorage.getItem('sumonnerName')}`,
);
const style = document.createElement('style');
if (data === null) {
	style.innerHTML = `
      #scrim-recruit-btn {
        display: none;
      }
    `;
	document.head.appendChild(style);
}
