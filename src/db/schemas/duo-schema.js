import { Schema } from 'mongoose';

const DuoSchema = new Schema(
  {
    SummonerName:{
      type:String,
      required: true,
    },
    MainPosition: {
      type: String,
      required: true,
    },
    SearchTier: {
      type: String,
      required: true,
    },
    SearchPosition: {
      type: String,
      required: true,
    },
    DuoComment: {
      type: String,
      required: true,
    },
    MyTier:{
      type: String,
      required: true,
    },
  },
  {
    collection: 'duo',
    timestamps: true,
  }
);

export { DuoSchema };
