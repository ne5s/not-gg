import * as Api from '/api.js';

const fetchRankingList = async () => {
	try {
		const RankingList = await Api.get('/api/soloRanking');
		document.querySelector('#Rank-item-table').insertAdjacentHTML(
			'afterbegin',
			`${RankingList
				.map(
					(ranking) =>
						`
						<tr>
						<th scope="row">1</th>
						<td class="summoner-name">어리고 싶다</td>
						<td>Challenger</td>
						<td>1144 LP</td>
						<td>
							<div class="most3">
								<div class="circle"></div>
								<div class="circle"></div>
								<div class="circle"></div>
							</div>
						</td>
						<td>56%</td>
					</tr>
				`,
				)
				.join('')}`,
		);
	} catch (err) {
		console.error(err.stack);
		alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
	}
};

// 소환사 이름 클릭시 상세 페이지로 이동
const attachEvent = () => {
	const items = document.querySelectorAll('.summoner-name');
	items.forEach((item) => {
		item.addEventListener('click', function () {
			const sumomonerName = this.getAttribute('data-product-name');
			window.location.href = `/product_detail/?name=${productName}`;
		});
	});
};

await fetchRankingList();
attachEvent();

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
