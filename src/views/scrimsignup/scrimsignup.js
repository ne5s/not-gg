import * as Api from '/api.js';

//내전 모집 랜더링
const recruitName = document.getElementById('recruit-name');
const scrimDate = document.getElementById('scrim-date');

recruitName.innerHTML = '${}'; //db에서 가져온 소환사 이름(미설정)
scrimDate.innerHTML = '${}'; //db에서 가져온 내전 시간(미설정)

//신청하기 클릭시 로그인 된 소환사 이름 입력
const sumonnerNameAttach = () => {
	const binRecruit = document.getElementById('scrim-member recruit');
	items.forEach((binRecruit) => {
		item.addEventListener('click', function () {
			const sumomonerName = this.getAttribute('data-summoner-name'); // 랜더링 될 때 설정해주기(미설정)
			binRecruit.innerHTML = '${summonerName}'; //db에서 가져온 소환사 이름(미설정)
			binRecruit.className = 'recruit-name';
		});
	});
};
sumonnerNameAttach();

// 각 라인에 소환사 이름 입력 랜더링


// 아이디 버튼 누르면 전적 검색 페이지 이동
const attachEvent = () => {
	const items = document.querySelector('.scrim-member lane');
	items.forEach((item) => {
		item.addEventListener('click', function () {
			const sumomonerName = this.getAttribute('data-summoner-name'); // 랜더링 될 때 설정해주기(미설정)
			window.location.href = `/pvplog/${sumomonerName}`;
		});
	});
};

// 로그인 된 소환사 이름과 내전 모집을 한 소환사 이름이 같을 때 내전 삭제 버튼 표시
const data = await Api.get(
	`/api/users/${localStorage.getItem('summonerName')}`,
);
const style = document.createElement('style');
if (data != this.sumomonerName) {
	// 랜더링 될 때 설정해주기(미설정)
	style.innerHTML = `
    .scrim-member base-del {
        display: none;
      }
    `;
	document.head.appendChild(style);
}

attachEvent();

//내전 삭제 버튼 클릭 이벤트
const scrimDelBtn = document.querySelector('.scrim-member base-del');
scrimDelBtn.addEventListener("click", btnClickEvent);
async function btnClickEvent(e) {
    const btnDelete = e.target.closest('.scrim-member base-del');

    if (btnDelete) {
        if (confirm("정말 삭제하시겠습니까??") == true){
            const targetId = btnDelete.name;
            console.log(targetId)
            const res = await Api.delete('/api/scrim', '', {targetId}); //api 추가해주기(미설정)

            location.reload();
        }else{
            return false;
        }
    } 
}
