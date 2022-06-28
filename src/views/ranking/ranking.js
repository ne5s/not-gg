// opgg 크롤링 연습

// const axios = require('axios');
// const cheerio = require('cheerio');
// const log = console.log;

// const getHtml = async () => {
// 	try {
// 		return await axios.get('https://www.op.gg/leaderboards/tier?region=kr');
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

// getHtml()
// 	.then((html) => {
// 		let ulList = [];
// 		const $ = cheerio.load(html.data);
// 		const $bodyList = $('tbody').children('tr');

// 		$bodyList.each(function (i, elem) {
// 			ulList[i] = {
// 				summoner: $(this).find('strong.summoner-name').text(),
// 				tier: $(this).find('td.css-1gm6o8r e1g3wlsd6').text(),
// 			};
// 		});

// 		const data = ulList.filter((n) => n.title);
// 		return data;
// 	})
// 	.then((res) => log(res));

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
