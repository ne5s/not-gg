import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';
import { summonerSoloService } from '../services';
import { duoService } from '../services'

const DouRouter = Router();

DouRouter.get('/duo', async function (req,res,next) {
  try {
    const page = Number((req.query.page).replace('/', ''))
    const DouPageData = await duoService.getDuos(page)
    res.status(200).json(DouPageData);
  } catch (error) {
    next(error);
  }
})
// 사용자 정보 수정
// (예를 들어 /api/users/abc12345 로 요청하면 req.params.userId는 'abc12345' 문자열로 됨)
DouRouter.post(
  '/duo',
  loginRequired,
  async function (req, res, next) {
    try {
      // params로부터 id를 가져옴
      const SummonerName = req.currentSummonerName
      let MyTier = await summonerSoloService.getSoloBySummonerName(SummonerName)
      MyTier = MyTier.tier
      const { MainPosition, SearchTier, SearchPosition, DuoComment } = req.body
      console.log(MainPosition, SearchTier, SearchPosition, DuoComment)
      const newDuo = await duoService.addUser({
        SummonerName,
        MainPosition, 
        SearchTier, 
        SearchPosition, 
        DuoComment,
        MyTier
      });

      res.status(200).json({"ok":"ok"});
    } catch (error) {
      next(error);
    }
  }
);

export { DouRouter };
