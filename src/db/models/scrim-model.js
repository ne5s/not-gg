import { model } from 'mongoose';
import { ScrimSchema } from '../schemas/scrim-schema';

const Scrim = model('scrims', ScrimSchema);

export class ScrimModel {
	async findByObjectId(id) {
		const scrim = await Scrim.findOne({ _id: id });
		return scrim;
	}

	async findByWriterSummonerName(summonerName) {
		const scrim = await Scrim.findOne({ writerSummonerName: summonerName });
		return scrim;
	}

	async create(scrimInfo) {
		const createdNewScrim = await Scrim.create(scrimInfo);
		return createdNewScrim;
	}

	async findAll() {
		const scrims = await Scrim.find({});
		return scrims;
	}

	async update({ id, update }) {
		const filter = { _id: id };
		const option = { returnOriginal: false };

		const updatedScrim = await Scrim.findOneAndUpdate(filter, update, option);
		return updatedScrim;
	}

	async delete(id) {
		await Scrim.deleteOne({ _id: id });
		return;
	}
}

const scrimModel = new ScrimModel();

export { scrimModel };
