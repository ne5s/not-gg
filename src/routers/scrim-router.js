import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';
import {
	userService,
	summonerSoloService,
	summonerFlexService,
	matchService,
	scrimService,
	scrimDetailService,
} from '../services';

const scrimRouter = Router();

// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
scrimRouter.get('/scrims', loginRequired, async function (req, res, next) {
	try {
		// 전체 내전 목록 가져옴
		let scrims = await scrimService.getScrims();
		// console.log(typeof scrims);
		let scrimsToObject = JSON.stringify(scrims);
		// console.log(typeof scrimsToObject);
		// console.log(scrimsToObject);
		let scrimsTo = JSON.parse(scrimsToObject);
		// console.log(scrimsTo);
		for (let i = 0; i < scrimsTo.length; i++) {
			scrimsTo[i]['resultDate'] = new Date(
				scrimsTo[i].matchDate + ' ' + scrimsTo[i].matchTime,
			);
		}

		scrimsTo.sort(function (a, b) {
			return a.resultDate - b.resultDate;
		});
		// console.log(scrimsTo);
		// console.log(new Date().getTimezoneOffset());
		// console.log(new Date('2022-06-30 15:30'));
		// console.log(new Date());
		// 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
		// const curr = new Date();
		// console.log('현재시간(Locale) : ' + curr);

		// // 2. UTC 시간 계산
		// const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

		// // 3. UTC to KST (UTC + 9시간)
		// const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
		// const kr_curr = new Date(utc + KR_TIME_DIFF);

		// console.log('한국시간 : ' + kr_curr);
		// const getWeek = (strsDate) => {
		// 	const weekName = new Array('일', '월', '화', '수', '목', '금', '토');
		// 	console.log(new Date(strsDate));
		// 	var dayOfWeek = weekName[new Date(strsDate).getDay()];
		// 	return dayOfWeek;
		// };
		// console.log(getWeek('2022-06-30'));
		res.status(200).json(scrimsTo);
	} catch (error) {
		next(error);
	}
});

// 스크림 상세보기 클릭 시, scrimId는 req.params로 전달
scrimRouter.get(
	'/scrimDetail/:scrimId',
	loginRequired,
	async function (req, res, next) {
		try {
			// 해당 내전 상세보기 데이터를 가져옴
			const { scrimId } = req.params;
			const scrimDetail =
				await scrimDetailService.getScrimDetailByScrimObjectId(scrimId);

			res.status(200).json(scrimDetail);
		} catch (error) {
			next(error);
		}
	},
);

scrimRouter.post('/scrim', loginRequired, async function (req, res, next) {
	try {
		if (is.emptyObject(req.body)) {
			throw new Error(
				'headers의 Content-Type을 application/json으로 설정해주세요',
			);
		}

		const { matchDate, matchTime, summonerName, selectedPosition } = req.body;

		// scrim DB 생성
		const newScrim = await scrimService.addScrim({
			matchDate,
			matchTime,
			writerSummonerName: summonerName,
		});
		let whereIsPosition = 'team1' + selectedPosition;

		// scrimDetail DB 생성
		const newScrimDetail = await scrimDetailService.addScrimDetail({
			scrimId: newScrim._id,
			[whereIsPosition]: summonerName,
		});

		res.status(201).json({ newScrim, newScrimDetail });
	} catch (error) {
		next(error);
	}
});

/* // 스크림 시간 변경
scrimRouter.patch('/scrim', loginRequired, async function (req, res, next) {
    try {

        if (is.emptyObject(req.body)) {
			throw new Error(
				'headers의 Content-Type을 application/json으로 설정해주세요',
			);
		}

        const { matchDate, matchTime, summonerName, selectedPosition } = req.body;

    } catch(error) {
        next(error);
    }
}) */

// scrimDetail 페이지에서 신청하기 클릭 시
scrimRouter.patch(
	'/addScrimDetail',
	loginRequired,
	async function (req, res, next) {
		try {
			if (is.emptyObject(req.body)) {
				throw new Error(
					'headers의 Content-Type을 application/json으로 설정해주세요',
				);
			}

			const { scrimId, matchDate, matchTime, summonerName, selectedPosition } =
				req.body;
			// 수정하기에서는 selectedPosition이 team + 1 or 2 + TOP 이런식으로 오도록 요청
			const toUpdate = {
				...(selectedPosition && { [selectedPosition]: summonerName }),
			};

			const updatedScrimDetail = await scrimDetailService.setScrimDetailForAdd(
				scrimId,
				toUpdate,
			);
			const scrim = await scrimService.getScrimByObjectId(scrimId);
			const toUpdate2 = {
				...(scrim && { currentApplyingNum: scrim.currentApplyingNum + 1 }),
			};
			const updatedScrim = await scrimService.setScrimNum(scrimId, toUpdate2);

			res.status(200).json({ updatedScrimDetail, updatedScrim });
		} catch (error) {
			next(error);
		}
	},
);

// scrimDetail 페이지에서 X버튼 클릭 시
scrimRouter.patch(
	'/cancelScrimDetail',
	loginRequired,
	async function (req, res, next) {
		try {
			if (is.emptyObject(req.body)) {
				throw new Error(
					'headers의 Content-Type을 application/json으로 설정해주세요',
				);
			}

			const { scrimId, matchDate, matchTime, summonerName, selectedPosition } =
				req.body;
			// 수정하기에서는 selectedPosition이 team + 1 or 2 + TOP 이런식으로 오도록 요청
			const toUpdate = {
				...(selectedPosition && { [selectedPosition]: '' }),
			};
			const updatedScrimDetail =
				await scrimDetailService.setScrimDetailForCancel(scrimId, toUpdate);

			const scrim = await scrimService.getScrimByObjectId(scrimId);
			const toUpdate2 = {
				...(scrim && { currentApplyingNum: scrim.currentApplyingNum - 1 }),
			};
			const updatedScrim = await scrimService.setScrimNum(scrimId, toUpdate2);

			res.status(200).json({ updatedScrimDetail, updatedScrim });
		} catch (error) {
			next(error);
		}
	},
);
// 내전 삭제. 내전 등록한 유저만
scrimRouter.delete('/scrim', loginRequired, async function (req, res, next) {
	try {
		const { scrimId } = req.body;
		await scrimService.deleteScrim(scrimId);

		await scrimDetailService.deleteScrimDetail(scrimId);
		res.status(200).json({ status: 'ok' });
	} catch (error) {
		next(error);
	}
});

export { scrimRouter };
