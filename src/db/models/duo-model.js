import { model } from 'mongoose';
import { DuoSchema } from '../schemas/duo-schema';

const Duos = model('duo', DuoSchema);

export class DuoModel {

	async create(DuoInfo) {
		const createdNewDuo = await Duos.create(DuoInfo);
		return createdNewDuo;
	}

    async findDuos(page){
        console.log(page)
        const DuosData = await Duos.find({})
            .skip(10 * Number(page))
            .limit(10)
        return DuosData
    }

	async delete(id) {
		await Duos.deleteOne({ id });
		return;
	}
}

const duoModel = new DuoModel();

export { duoModel };
