import { scrimDetailModel } from '../db';

class ScrimDetailService {
	// 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
	constructor(scrimDetailModel) {
		this.scrimDetailModel = scrimDetailModel;
	}

	// 내전 디테일 추가
	async addScrimDetail(scrimDetailInfo) {
		// db에 저장
		const createdNewScrimDetail = await this.scrimDetailModel.create(
			scrimDetailInfo,
		);

		return createdNewScrimDetail;
	}

	// 내전 디테일 전체 목록을 받음.
	async getScrimDetails() {
		const scrimDetails = await this.scrimDetailModel.findAll();
		return scrimDetails;
	}

	// 내전 디테일 사람 추가(버튼 클릭)
	async setScrimDetail(scrimId, toUpdate) {
		// 객체 destructuring,
		// id : scrim ObjectId, summonerName : 로그인 한 사람의 소환사명

		// 업데이트 진행
		const scrimDetail = await this.scrimDetailModel.update({
			scrimId,
			update: toUpdate,
		});

		return scrimDetail;
	}

	// 스크림 디테일 찾기(스크림의 ObjectId로)
	async getScrimDetailByScrimObjectId(id) {
		const scrimDetail = await this.scrimDetailModel.findByScrimObjectId(id);
		return scrimDetail;
	}

	// 스크림 디테일 삭제
	async deleteScrimDetail(id) {
		await this.scrimDetailModel.delete(id);
		return;
	}
}

const scrimDetailService = new ScrimDetailService(scrimDetailModel);

export { scrimDetailService };
