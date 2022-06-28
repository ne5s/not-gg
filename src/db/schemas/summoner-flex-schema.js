import { Schema } from 'mongoose';

const SummonerFlexSchema = new Schema(
	{
		summonerName: {
			type: String,
		},
		tier: {
			type: String,
		},
		rank: {
			type: String,
		},
		leaguePoints: {
			type: Number,
		},
		wins: {
			type: Number,
		},
		losses: {
			type: Number,
		},
		winRate: {
			type: Number,
		},
		miniSeries: {
			// 승급전 정보. 승급전 중이면 있고, 없으면 존재x
			type: new Schema(
				{
					target: Number, // 몇 승 조건인지. 승급전 -> 2, 승격전 -> 3
					wins: Number, // 현재 승급전 몇 승
					losses: Number, // 현재 승급전 몇 패
					progress: String, // LNNNN 이런 식으로 표기 됨 (x - - - -)
				},
				{
					_id: false,
				},
			),
			required: false,
		},
		updateDate: {
			// 전적 갱신 일자
			type: String,
		},
	},
	{
		collection: 'summonerFlex',
		timestamps: true,
	},
);

export { SummonerFlexSchema };
