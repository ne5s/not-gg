import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired, findMatches } from '../middlewares';
import {
	userService,
	summonerSoloService,
	summonerFlexService,
	matchService,
} from '../services';

const soloRouter = Router();

// 전체 유저 목록을 가져옴 (배열 형태임)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
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

export { soloRouter };
