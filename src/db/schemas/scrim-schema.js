import { Schema } from 'mongoose';

const ScrimSchema = new Schema(
	{
		matchDate: {
			// YYYY-MM-DD
			type: String,
			required: true,
		},
		matchTime: {
			// HH-MM
			type: String,
			required: true,
		},
		writerSummonerName: {
			type: String,
			required: true,
		},
		isRecruiting: {
			type: Boolean,
			required: false,
			default: true,
		},
		currentApplyingNum: {
			type: Number,
			default: 1,
		},
	},
	{
		collection: 'scrims',
		timestamps: true,
	},
);

export { ScrimSchema };
