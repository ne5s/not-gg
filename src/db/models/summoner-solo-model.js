import { model } from 'mongoose';
import { SummonerSoloSchema } from '../schemas/summoner-solo-schema';

const SummonerSolo = model('summonerSolo', SummonerSoloSchema);

export class SummonerSoloModel {
	async findBySummonerName(summonerName) {
		const summonerSolo = await SummonerSolo.findOne({ summonerName });
		return summonerSolo;
	}

	async create(summonerSoloInfo) {
		const createdNewSummonerSolo = await SummonerSolo.create(summonerSoloInfo);
		return createdNewSummonerSolo;
	}

	async findAll() {
		const users = await SummonerSolo.find({});
		return users;
	}

	async update({ summonerName, update }) {
		const filter = { summonerName };
		const option = { returnOriginal: false };

		const updatedUser = await SummonerSolo.findOneAndUpdate(
			filter,
			update,
			option,
		);
		return updatedUser;
	}

	async delete(summonerName) {
		await SummonerSolo.deleteOne({ summonerName });
		return;
	}
}

const summonerSoloModel = new SummonerSoloModel();

export { summonerSoloModel };
