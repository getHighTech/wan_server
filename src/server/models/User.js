import WanModel from "../core/model.js";

import ServerKey from './ServerKey.js';
import {decipher} from '../../both/ciphers.js';

import bcrypt from "bcrypt";

class User extends WanModel {
    constructor(props){
        super(props);
        this.collection = "users";
    }
    static async reg(userParams){
      let key = await ServerKey.model.findOne({msgCiphered: userParams.sign});
      //先验证签名
      if(key){
          //若是签名有效在用公钥解密密码
          let  password = decipher('aes192', userParams.sign, userParams.passowrd);  //使用签名解密

          try {
            //解密之后立刻删除这个token，
            await ServerKey.model.remove({msgCiphered: userParams.sign});


            let hashpassword = await bcrypt.hashSync(password, 10);

            console.log({hashpassword});

            let regRlt = await this.model.create({
               hashpassword,
              "username" : userParams.username,
              "createdAt": new Date()

            });

            console.log({regRlt});
            


            
            let key = await ServerKey.genPublicKey
            (
              userParams.uuid,
              "reg",
              {
                  "regDate": new Date(),
                   "regUsername": userParams.username,
                    userId: regRlt._id
              }
              , hashpassword
            );



            return {
              token: key.msgCiphered,
              regUsername: userParams.username
            };

          } catch (err) {
              console.error(" in the User reg", err);
          }


      }else{
        return "INVALID TOKEN";
      }

    }
}

User.setScheme(
    {
        "_id": String,
        "createdAt" : { type: Date, default: Date.now },
        "hashpassword": String,
        "username" : String,
        "profile" : {
            "mobile" : String,
            "isNewFromMobile" : Boolean
        },
        "score" : Number,
        "logintimes" : Number,
        "lastLoginTime" :  { type: Date, default: Date.now },

        "nickname" : String,
        "dataAutograph" : String,
    },
    "User", "users"

)

export default  User;
