import { model } from 'mongoose';
import { ScrimDetailSchema } from '../schemas/scrim-detail-schema';

const ScrimDetail = model('scrimDetails', ScrimDetailSchema);

export class ScrimDetailModel {
	async findByObjectId(id) {
		const scrimDetail = await ScrimDetail.findOne({ _id: id });
		return scrimDetail;
	}

	async findByScrimObjectId(id) {
		const scrimDetail = await ScrimDetail.findOne({ scrimId: id }).populate(
			'scrimId',
		);
		return scrimDetail;
	}

	async create(scrimDetailInfo) {
		const createdNewScrimDeatil = await ScrimDetail.create(scrimDetailInfo);
		return createdNewScrimDeatil;
	}

	async findAll() {
		const scrimDetails = await ScrimDetail.find({});
		return scrimDetails;
	}

	async update({ scrimId, update }) {
		const filter = { scrimId };
		const option = { returnOriginal: false };

		const updatedScrimDetail = await ScrimDetail.findOneAndUpdate(
			filter,
			{ $unset: update },
			option,
		);
		return updatedScrimDetail;
	}

	async delete(scrimId) {
		await ScrimDetail.deleteOne({ scrimId });
		return;
	}
}

const scrimDetailModel = new ScrimDetailModel();

export { scrimDetailModel };
