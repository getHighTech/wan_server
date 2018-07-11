import WanModel from "../core/model.js";
import Axios from 'axios';

class WeChatUser extends WanModel {
    constructor(props){
        super(props);
        this.collection = "we_chat_users";
    }
     static async createOrUpdate(openid, token){
      let userParams = await Axios.get(`https://api.weixin.qq.com/cgi-bin/user/info?access_token=${token}&openid=${openid}&lang=zh_CN`);

      let user = await this.model.findOne({openid});

      if(user){
        //update
        userParams = Object.assign({}, userParams, {
          updatedAt: new Date(),
        })
        await this.model.update({openid}, {
          $set: userParams
        })
      }else{
        //crate
        userParams = Object.assign({}, userParams, {
          createdAt: new Date()
        })
        await this.model.create(userParams);
      }

      let user =  await this.model.findOne({openid});
      console.log(user);
      return user;
    }

    static async getUserByOpenid(openid){
      let user = await this.model.findOne({openid});
      return user;
    }


}

WeChatUser.setScheme(
    {
        "createdAt" : { type: Date, default: Date.now },
        "updatedAt" : { type: Date, default: Date.now },
        "subscribe": Number,
        "openid": String,
        "nickname": String,
        "sex": Number,
        "language": String,
        "city": String,
        "province": String,
        "country": String,
        "headimgurl": String,
        "subscribe_time": Number,
        "unionid": String,
        "remark": String,
        "groupid": Number,
        "tagid_list": Array,
        "subscribe_scene": String,
        "qr_scene": Number,
        "qr_scene_str": String,
        "clientUUid": String,
      },
      "WeChatUser", "we_chat_users"
)

export default  WeChatUser;
