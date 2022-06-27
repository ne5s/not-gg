import { matchModel } from '../db';

class MatchService {
	// 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
	constructor(matchModel) {
		this.matchModel = matchModel;
	}

	// match 데이터 찾은 뒤 추가
	async addMatch(matchInfo) {
		// 객체 destructuring
		const { matchId } = matchInfo;

		// 아이디 중복 확인
		const match = await this.matchModel.findById(matchId);
		if (match) {
			console.log(
				'이 match 정보는 이미 등록되어 있습니다(같은 게임을 플레이한 유저의 검색으로)',
			);
			return;
		}

		// matchId 중복이 아니므로 db에 저장
		const createdNewMatch = await this.matchModel.create(matchInfo);
		return createdNewMatch;
	}

	// 랭크별, 일반별, 자유랭크별, 칼바람 조회
	async getSpecialMatches(queueId) {
		const matches = await this.matchModel.findByQueueId(queueId);
		return matches;
	}

	// 특정 matchId로 조회
	async getMatch(matchId) {
		const match = await this.matchModel.findById(matchId);
		return match;
	}

	// 전체 match 목록을 받음.
	async getMatches() {
		const matches = await this.matchModel.findAll();
		return matches;
	}

	// user1 밖에 안쓸 거라면 user1의 summonerName이 summonerName인 사람의 경기 모두 찾는 기능
	async getMatchesBySummonerName(summonerName) {
		const matches = await this.matchModel.findMatchBySummonerName(summonerName);
		return matches;
	}

	// 매치정보 삭제
	async deleteMatch(matchId) {
		await this.matchModel.delete(matchId);
		return;
	}
}

const matchService = new MatchService(matchModel);

export { matchService };
