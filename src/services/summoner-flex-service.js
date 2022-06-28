import { summonerFlexModel, userModel } from '../db';

class SummonerFlexService {
	// 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
	constructor(summonerFlexModel) {
		this.summonerFlexModel = summonerFlexModel;
	}

	// 회원가입 시 자유랭크 정보 추가
	async addSummonerFlex(flexInfo) {
		// 객체 destructuring
		const { summonerName } = flexInfo;

		// 아이디 중복 확인
		const user = await this.summonerFlexModel.findBySummonerName(summonerName);
		if (user) {
			throw new Error(
				'이 소환사명은 현재 사용중입니다. 다른 소환사명을 입력해 주세요.',
			);
		}

		// 소환사명 중복은 이제 아니므로, DB 추가

		const createdNewFlex = await this.summonerFlexModel.create(flexInfo);

		return createdNewFlex;
	}

	async getFlexBySummonerName(summonerName) {
		const userFlex = await this.summonerFlexModel.findBySummonerName(
			summonerName,
		);
		return userFlex;
	}

	// 사용자 전체 목록을 받음.
	async getUsers() {
		const users = await this.summonerFlexModel.findAll();
		return users;
	}

	// 전적 갱신 시
	async setFlex(summonerName, toUpdate) {
		// 우선 해당 summonerName이 db에 있는지 확인
		let userFlex = await this.summonerFlexModel.findBySummonerName(
			summonerName,
		);

		// db에서 찾지 못한 경우, 에러 메시지 반환
		if (!userFlex) {
			throw new Error('이 유저의 자유랭크 정보가 등록되지 않았습니다.');
		}

		// 업데이트 진행
		updatedUserFlex = await this.summonerFlexModel.update({
			summonerName,
			update: toUpdate,
		});

		return updatedUserFlex;
	}

	// 자유랭크 정보 삭제
	async deleteFlex(summonerName) {
		await this.summonerFlexModel.delete(summonerName);
		return;
	}
}

const summonerFlexService = new SummonerFlexService(summonerFlexModel);

export { summonerFlexService };
