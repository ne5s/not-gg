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

  async getDuos(page){
    const GetDuos = await this.duoModel.findDuos(page)
    return GetDuos
  }

  async delete(duoId){
    const deltedDuo = await this.duoModel.delete(duoId)
    return deltedDuo
  }


}

const duoService = new DuoService(duoModel);

export { duoService };
