import * as Api from '/api.js';

soloRouter.get('/soloRanking', loginRequired, async function (req, res, next) {
	try {
		// 전체 사용자 목록(랭킹으로 sort된) 얻음
		const users = await summonerSoloService.getUsersForRanking();

		// 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});
console.log(users);

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
