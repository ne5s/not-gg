import { Schema } from 'mongoose';

const SummonerSoloSchema = new Schema(
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
		tierToNumber: {
			// 0 : CHALLENGER, 1 : GRANDMASTER, 2 : MASTER, 3 : DIAMOND, 4 : PLATINUM, 5 : GOLD, 6 : SILVER, 7 : BRONZE, 8 : IRON
			type: Number,
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
		matchFor20Games: {
			type: new Schema(
				{
					wins: Number,
					losses: Number,
					winRate: Number,
					killAverage: Number,
					deathAverage: Number,
					assistsAverage: Number,
					kdaAverage: String,
					killParticipationAverage: Number,
				},
				{
					_id: false,
				},
			),
		},
		sortedPlayChampsFor20Games: [
			{
				type: new Schema(
					{
						championName: String,
						counts: Number,
						wins: Number,
						losses: Number,
						kda: Number,
						championImageURL: String,
					},
					{
						_id: false,
					},
				),
			},
		],
		playLineFor20Games: {
			type: new Schema(
				{
					TOP: Number,
					JUNGLE: Number,
					MIDDLE: Number,
					BOTTOM: Number,
					UTILITY: Number,
				},
				{
					_id: false,
				},
			),
		},
		updateDate: {
			// 전적 갱신 일자
			type: String,
		},
	},
	{
		collection: 'summonerSolo',
		timestamps: true,
	},
);

export { SummonerSoloSchema };
