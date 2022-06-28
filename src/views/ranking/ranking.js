import * as Api from '/api.js';

const duoFormsBox = document.getElementById('duoFormsBox');
console.log(duoFormsBox);
addAllElements();

const duoDatas = await Api.get('/api/duo?page=0');
console.log(duoDatas);
makeDuo();

function makeDuo() {
	duoDatas.forEach((data) => {
		const duoComment = data.DuoComment;
		const MainPosition = data.MainPosition;
		const myTier = data.MyTier;
		const searchPosition = data.SearchPosition;
		const searchTier = data.SearchTier;
		const summonerName = data.SummonerName;
		const createdAt = data.createdAt;

		let tierIcon = '';
		switch (MainPosition) {
			case 'TOP':
				tierIcon = '탑';
				break;
			case 'JUNGLE':
				tierIcon = '정글';
				break;
			case 'MIDDLE':
				tierIcon = '미드';
				break;
			case 'BOTTOM':
				tierIcon = '원딜';
				break;
			case 'UTILITY':
				tierIcon = '서폿';
				break;
		}

		duoFormsBox.innerHTML += `
            <ul class="duo-forms-item-box">
                <li>
                    <span class="components">아파요 머리가</span>
                    <span>님이</span>
                    <span class="components">${searchTier} ${searchPosition}</span>
                    <span>를 찾고 있습니다</span>
                </li>
                <li>
                    <img src="../img/${tierIcon}.png" alt="">
                </li>
                <li>${myTier}</li>
                <li>
                    <span class="comment">${duoComment}</span>
                </li>
                <li>1분전</li>
                <li>
                    <div class="btn--delete">
                        <span class="material-icons">
                        clear
                        </span>
                    </div>
                </li>
            </ul>
        `;
	});
}

async function addAllElements() {
	getDuoDatas();
}

async function getDuoDatas() {
	//듀오 폼 가져와서
	//renderDuoForms으로 forEach
}

function renderDuoData(object) {
	//듀오 폼 하나하나 렌더링
	const DuoComment = duoDatas;
}

// topbutton
let topBtn = document.querySelector('.top-circle');

window.addEventListener('scroll', () => {
	if (this.scrollY > 200) {
		topBtn.classList.add('on');
	} else {
		topBtn.classList.remove('on');
	}
});

topBtn.addEventListener('click', (e) => {
	e.preventDefault();
	window.scrollTo({ top: 0, behavior: 'smooth' });
});
