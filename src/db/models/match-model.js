import { model } from 'mongoose';
import { MatchSchema } from '../schemas/match-schema';

const Match = model('matches', MatchSchema);

export class MatchModel {
	async findById(matchId) {
		const match = await Match.findOne({ matchId });
		return match;
	}

	async findByQueueId(queueId) {
		// 420 -> 솔로랭크, 440 -> 자유랭크, 450 -> 칼바람, 430 -> 일반
		const matches = await Match.find({ queueId });
		return matches;
	}

	// user1 밖에 안쓸 거라면 user1의 summonerName인 사람의 경기 모두 찾는 기능
	async findMatchBySummonerName(summonerName) {
		const matches = await Match.find({ 'users1.summonerName': summonerName });
		return matches;
	}

	async create(matchInfo) {
		const createdNewMatch = await Match.create(matchInfo);
		return createdNewMatch;
	}

	async findAll() {
		const matches = await Match.find({});
		return matches;
	}

	async update({ matchId, update }) {
		const filter = { matchId };
		const option = { returnOriginal: false };

		const updatedMatch = await User.findOneAndUpdate(filter, update, option);
		return updatedMatch;
	}

	async delete(matchId) {
		await Match.deleteOne({ matchId });
		return;
	}
}

const matchModel = new MatchModel();

export { matchModel };
