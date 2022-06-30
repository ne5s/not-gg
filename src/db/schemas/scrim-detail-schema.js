import { Schema } from 'mongoose';

const ScrimDetailSchema = new Schema(
	{
		scrimId: {
			type: Schema.Types.ObjectId,
			ref: 'scrims',
			required: true,
		},
		team1TOP: {
			type: String,
		},
		team1JUNGLE: {
			type: String,
		},
		team1MIDDLE: {
			type: String,
		},
		team1BOTTOM: {
			type: String,
		},
		team1UTILITY: {
			type: String,
		},
		team2TOP: {
			type: String,
		},
		team2JUNGLE: {
			type: String,
		},
		team2MIDDLE: {
			type: String,
		},
		team2BOTTOM: {
			type: String,
		},
		team2UTILITY: {
			type: String,
		},
	},
	{
		collection: 'scrimDetails',
		timestamps: true,
	},
);

export { ScrimDetailSchema };
