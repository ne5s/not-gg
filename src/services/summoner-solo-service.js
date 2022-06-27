import { summonerSoloModel } from '../db';

class SummonerSoloService {
	// 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
	constructor(summonerSoloModel) {
		this.summonerSoloModel = summonerSoloModel;
	}

	// 회원가입 시 솔로랭크 정보 추가
	async addSummonerSolo(soloInfo) {
		// 객체 destructuring
		const { summonerName } = soloInfo;

		// 아이디 중복 확인
		const user = await this.summonerSoloModel.findBysummonerName(summonerName);
		if (user) {
			throw new Error(
				'이 소환사명은 현재 사용중입니다. 다른 소환사명을 입력해 주세요.',
			);
		}

		// 소환사명 중복은 이제 아니므로, DB 추가

		const createdNewSolo = await this.summonerSoloModel.create(soloInfo);

		return createdNewSolo;
	}

	async getSoloBySummonerName(summonerName) {
		const userSolo = await this.summonerSoloModel.findBysummonerName(
			summonerName,
		);
		return userSolo;
	}

	// 사용자 전체 목록을 받음.
	async getUsers() {
		const users = await this.summonerSoloModel.findAll();
		return users;
	}

	// 전적 갱신 시
	async setSolo(summonerName, toUpdate) {
		// 우선 해당 summonerName이 db에 있는지 확인
		let userSolo = await this.summonerSoloModel.findBysummonerName(
			summonerName,
		);

		// db에서 찾지 못한 경우, 에러 메시지 반환
		if (!userSolo) {
			throw new Error('이 유저의 Solo Rank 정보가 등록되지 않았습니다.');
		}

		// 업데이트 진행
		updatedUserSolo = await this.summonerSoloModel.update({
			summonerName,
			update: toUpdate,
		});

		return updatedUserSolo;
	}

	// 솔로랭크 정보 삭제
	async deleteSolo(summonerName) {
		await this.summonerSoloModel.delete(summonerName);
		return;
	}
}

const summonerSoloService = new SummonerSoloService(summonerSoloModel);

export { summonerSoloService };
