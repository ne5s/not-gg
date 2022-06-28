import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired, findMatches } from '../middlewares';
import { matchService } from '../services';

const matchRouter = Router();
// 아직 구현x

// 회원가입 api (아래는 /register이지만, 실제로는 /api/register로 요청해야 함.)
matchRouter.post(
	'/register',
	async (req, res, next) => {
		try {
			// Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
			// application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
			if (is.emptyObject(req.body)) {
				throw new Error(
					'headers의 Content-Type을 application/json으로 설정해주세요',
				);
			}

			// req (request)의 body 에서 데이터 가져오기
			const { id, password, name, summonerName } = req.body;

			// 위 데이터를 유저 db에 추가하기
			const newUser = await userService.addUser({
				id,
				password,
				name,
				summonerName,
			});

			// 소환사 등록 시 해당 소환사명으로 매치 검색 위해 req.currentUserId를 통해 유저의 소환사명에 접근 가능하게 됨
			req.currentUserId = summonerName;

			// 추가된 유저의 db 데이터를 프론트에 다시 보내줌
			// 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
			// res.status(201).json(newUser);
			next();
		} catch (error) {
			next(error);
		}
	},
	findMatches,
);

// 로그인 api (아래는 /login 이지만, 실제로는 /api/login로 요청해야 함.)
userRouter.post('/login', async function (req, res, next) {
	try {
		// application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
		if (is.emptyObject(req.body)) {
			throw new Error(
				'headers의 Content-Type을 application/json으로 설정해주세요',
			);
		}

		// req (request) 에서 데이터 가져오기
		const { id, password } = req.body;

		// 로그인 진행 (로그인 성공 시 jwt 토큰을 프론트에 보내 줌)
		const userToken = await userService.getUserToken({ id, password });

		// jwt 토큰을 프론트에 보냄 (jwt 토큰은, 문자열임)
		res.status(200).json(userToken);
	} catch (error) {
		next(error);
	}
});

// 전체 유저 목록을 가져옴 (배열 형태임)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
userRouter.get('/userlist', loginRequired, async function (req, res, next) {
	try {
		// 전체 사용자 목록을 얻음
		const users = await userService.getUsers();

		// 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});

export { matchRouter };
