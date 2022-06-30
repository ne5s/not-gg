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
		const scrims = await scrimService.getScrims();

		// 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
		res.status(200).json(scrims);
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

			const updatedScrimDetail = await scrimDetailService.setScrimDetail(
				scrimId,
				toUpdate,
			);
			res.status(200).json(updatedScrimDetail);
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

			const updatedScrimDetail = await scrimDetailService.setScrimDetail(
				scrimId,
				toUpdate,
			);

			res.status(200).json(updatedScrimDetail);
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
	} catch (error) {
		next(error);
	}
});

export { scrimRouter };
