import { model } from 'mongoose';
import { UserSchema } from '../schemas/user-schema';

const User = model('users', UserSchema);

export class UserModel {
	async findByName(name) {
		const user = await User.findOne({ name });
		return user;
	}

	async findById(id) {
		const user = await User.findOne({ id });
		return user;
	}

	async findBySummonerName(summonerName) {
		const user = await User.findOne({ summonerName });
		return user;
	}

	async create(userInfo) {
		const createdNewUser = await User.create(userInfo);
		return createdNewUser;
	}

	async findAll() {
		const users = await User.find({});
		return users;
	}

	async update({ id, update }) {
		const filter = { id };
		const option = { returnOriginal: false };

		const updatedUser = await User.findOneAndUpdate(filter, update, option);
		return updatedUser;
	}

	async updateBySummonerName({ summonerName, update }) {
		const filter = { summonerName };
		const option = { returnOriginal: false };

		const updatedUser = await User.findOneAndUpdate(filter, update, option);
		return updatedUser;
	}

	async delete(id) {
		await User.deleteOne({ id });
		return;
	}
}

const userModel = new UserModel();

export { userModel };
