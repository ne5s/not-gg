import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

//table 랜더링
const fetchRankingList = async () => {
	try {
		const RankingList = await Api.get('/api/soloRanking');
		console.log(RankingList);
		document.querySelector('#rank-item-table').insertAdjacentHTML(
			'afterbegin',
			`${RankingList.map(
				(ranking, index) =>
					`
						<tr>
						<th scope="row">${index + 1}</th>
						<td class="summoner-name" data-summoner-name="${ranking.summonerName}">${
						ranking.summonerName
					}</td>
						<td>${ranking.tier} ${ranking.rank}</td>
						<td>${addCommas(ranking.leaguePoints)}LP</td>
						<td>
							<div class="most3">
								<div class="circle"><img src="${
									ranking.sortedPlayChampsFor20Games[0]?.championImageURL
								}"onerror="this.style.display='none'"></div>
								<div class="circle"><img src="${
									ranking.sortedPlayChampsFor20Games[1]?.championImageURL
								}"onerror="this.style.display='none'"></div>
								<div class="circle"><img src="${
									ranking.sortedPlayChampsFor20Games[2]?.championImageURL
								}"onerror="this.style.display='none'"></div>
							</div>
						</td>
						<td>${Math.floor(ranking.winRate)}%</td>
					</tr>
				`,
			).join('')}`,
		);
	} catch (err) {
		console.error(err.stack);
		alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
	}
};

// 소환사 이름 클릭시 상세 페이지로 이동
// 소환사 이름에 띄어쓰기가 있을 때 제거하는 함수
const removeSpace = (string) => {
	return string.replace(/\s/g, ''); //문자열 내 공백 제거
};

const attachEvent = () => {
	const items = document.querySelectorAll('.summoner-name');
	items.forEach((item) => {
		item.addEventListener('click', function () {
			const summonerName = this.getAttribute('data-summoner-name');
			console.log(summonerName);
			window.location.href = `/pvplog/${summonerName}`;
		});
	});
};

await fetchRankingList();
attachEvent();

// topbutton
let topBtn = document.querySelector('.top-circle');

window.addEventListener('scroll', () => {
	if (window.scrollY < 200) {
		topBtn.classList.add('hide');
	} else {
		topBtn.classList.remove('hide');
	}
});

topBtn.addEventListener('click', (e) => {
	e.preventDefault();
	window.scrollTo({ top: 0, behavior: 'smooth' });
});
