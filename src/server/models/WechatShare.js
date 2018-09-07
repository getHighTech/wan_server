import WanModel from "../core/model.js";
import mongoose from 'mongoose';

class WechatShare extends WanModel {
    constructor(props){
        super(props);
        this.collection = "wechatshare";
    }
    static async InsertShare(access_token,ticket){
      console.log('走了这');
      console.log(this.model);
      let wechatshare =await new this.model({
        "_id": mongoose.Types.ObjectId(),
        access_token,
        ticket,
        createdAt:new Date()
      })
      await wechatshare.save({
          _id: wechatshare._id,
      });
      return {
           wechatshare

      }
    }
  }

    WechatShare.setScheme(
        {
            "_id":String,
            "createdAt":Date,
            "access_token": String,
            "ticket": String,
          },
          {versionKey: false},
          "WechatShare", "wechatshare"
    )

export default  WechatShare;
