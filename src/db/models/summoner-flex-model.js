import { model } from 'mongoose';
import { SummonerFlexSchema } from '../schemas/summoner-flex-schema';

const SummonerFlex = model('summonerFlex', SummonerFlexSchema);

export class SummonerFlexModel {
	async findBysummonerName(summonerName) {
		const summonerSolo = await SummonerFlex.findOne({ summonerName });
		return summonerSolo;
	}

	async create(summonerSoloInfo) {
		const createdNewSummonerSolo = await SummonerFlex.create(summonerSoloInfo);
		return createdNewSummonerSolo;
	}

	async findAll() {
		const users = await SummonerFlex.find({});
		return users;
	}

	async update({ summonerName, update }) {
		const filter = { summonerName };
		const option = { returnOriginal: false };

		const updatedUser = await SummonerFlex.findOneAndUpdate(
			filter,
			update,
			option,
		);
		return updatedUser;
	}

	async delete(summonerName) {
		await SummonerFlex.deleteOne({ summonerName });
		return;
	}
}

const summonerFlexModel = new SummonerFlexModel();

export { summonerFlexModel };
