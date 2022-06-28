import { duoModel } from '../db';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class DuoService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(duoModel) {
    this.duoModel = duoModel;
  }

  async addUser(duoInfo) {
    const { MainPosition, SearchTier, SearchPosition, DuoComment, MyTier} = duoInfo;
    const createdNewDuo = await this.duoModel.create(duoInfo)

    // const createdNewUser = await this.userModel.create(newUserInfo);

    return createdNewDuo;
  }

  // 계정 찾기(by name)
  async getDuos(page) {
    console.log(page)
    const duos = await this.duoModel.findDuos(page);
    return duos;
  }


}

const duoService = new DuoService(duoModel);

export { duoService };
