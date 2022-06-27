import { Schema } from 'mongoose';

const SummonerSoloSchema = new Schema(
  {
    summonerName: {
        type : Schema.Types.ObjectId, 
        ref : 'users', 
        required: true
    },
    tier: {
      type: String,
    },
    rank: {
      type: String,
    },
    leaguePoints: {
      type: String,
    },
    wins: {
      type: String,
    },
    losses : {
      type : String
    },
    miniSeries : { // 승급전 정보. 승급전 중이면 있고, 없으면 존재x
      type : new Schema(
        {
            target : Number, // 몇 승 조건인지. 승급전 -> 2, 승격전 -> 3
            wins : Number, // 현재 승급전 몇 승
            losses : Number, // 현재 승급전 몇 패
            progress : String, // LNNNN 이런 식으로 표기 됨 (x - - - -) 
        },
        {
            _id : false,
        }
      ),
      required : false
    },
    updateDate : { // 전적 갱신 일자
        type: String
    }
  },
  {
    collection: 'summonerSolo',
    timestamps: true,
  }
);

export { SummonerSoloSchema };
