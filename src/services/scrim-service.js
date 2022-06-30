import { scrimModel } from '../db';

class ScrimService {
	// 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
	constructor(scrimModel) {
		this.scrimModel = scrimModel;
	}

	// 내전 추가
	async addScrim(scrimInfo) {
		// db에 저장
		const createdNewScrim = await this.scrimModel.create(scrimInfo);

		return createdNewScrim;
	}

	// 내전 전체 목록을 받음.
	async getScrims() {
		const scrims = await this.scrimModel.findAll();
		return scrims;
	}

	// 내전 수정
	async setScrim(userInfoRequired, toUpdate) {
		// 객체 destructuring
		// id : scrim ObjectId, summonerName : 로그인 한 사람의 소환사명
		const { summonerName, id } = userInfoRequired;

		// 글쓴이와 수정하려는 사람의 summonerName이 같은 지 확인
		const scrim = await this.scrimModel.findByObjectId(id);

		if (summonerName !== scrim.writerSummonerName) {
			throw new Error('글쓴이가 아닙니다.');
		}

		// 업데이트 진행
		scrim = await this.scrimModel.update({
			id,
			update: toUpdate,
		});

		return scrim;
	}

	// 스크림 찾기(스크림의 ObjectId로)
	async getScrimByObjectId(id) {
		const scrim = await this.scrimModel.findByObjectId(id);
		return scrim;
	}

	// 내전 삭제
	async deleteScrim(id) {
		await this.scrimModel.delete(id);
		return;
	}
}

const scrimService = new ScrimService(scrimModel);

export { scrimService };
