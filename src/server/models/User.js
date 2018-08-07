import WanModel from "../core/model.js";

import ServerKey from './ServerKey.js';
import {decipher} from '../../both/ciphers.js';

import bcrypt from "bcrypt";
import mongoose from "mongoose";
import MobileSMS from "./MobileSMS.js";

class User extends WanModel {
    constructor(props){
        super(props);
        this.collection = "users";
    }

    static async mobileLogin(loginParams){
        let key = await ServerKey.model.findOne({msgCiphered: loginParams.sign});
      //先验证签名
      if(key){
           //若是签名有效在用公钥解密密码
           let  SMS = decipher('aes192', loginParams.sign, loginParams.sms);  //使用签名解密
           await ServerKey.model.remove({msgCiphered: loginParams.sign});

           let mobileSMS = await MobileSMS.model.findOne({mobile: loginParams.mobile, SMS});
           if(!mobileSMS){
                let key = await ServerKey.genPublicKey
                (
                loginParams.uuid,
                "random",
                {
                    msg: "SMS WRONG"
                }
                , SMS
                );
                return {
                    type: "error",
                    reason: "SMS WRONG",
                    token: key.msgCiphered
                }
           }
           let mobileAsUser = await this.model.findOne({username: loginParams.mobile})
           let userAsMobile = await this.model.findOne({'profile.mobile': loginParams.mobile});
           let dealUser = null;
           if(mobileAsUser || userAsMobile){
                //用户存在
                dealUser = mobileAsUser;
                if(!dealUser){
                    dealUser = userAsMobile;
                }
                let key = await ServerKey.genPublicKey
                (
                    loginParams.uuid,
                "login",
                {
                    "loginDate": new Date(),
                    "userId": dealUser._id,
                }
                , dealUser.hashpassword
                )
                let option = null;
                if(!dealUser.passwordSettled){
                    option = "NEED TO SET PASSWORD";
                }

                return {
                    type: "success",
                    msg: "LOGIN SUCCESS",
                    token: key.msgCiphered,
                    option,
                }

           }else{
                //用户不存在, 注册
                let passowrd = cipher('aes192', token, "112!!@358#%*");
                let regRlt = await this.reg({
                    username: loginParams.mobile,
                    passowrd,
                    sign: loginParams.sign,
                    uuid: loginParams.uuid,
                  })
                if(!regRlt.type !== "success"){
                    return  {
                        type: "error",
                        reason: regRlt.reason,
                    }
                }
                let updateRlt = await this.model.update({username: loginParams.mobile}, {
                    $set:{
                        passwordSettled: false,
                    }
                })
                let dealUser = await this.model.findOne({username: loginParams.mobile});

                if(updateRlt && dealUser){
                    let key = await ServerKey.genPublicKey
                    (
                        loginParams.uuid,
                    "login",
                    {
                        "loginDate": new Date(),
                        "mobile": dealUser._id,
                    }
                    , dealUser.hashpassword
                    )
                    let option = null;
                    if(!dealUser.passwordSettled){
                        option = "NEED TO SET PASSWORD";
                    }

                    return {
                        type: "success",
                        msg: "CREATE OR LOGIN SUCCESS",
                        token: key.msgCiphered,
                        option,
                    }
                }

           }

      }else{
          return {
              type: "error",
              reason: "invalid token"
          }
      }
    }

    static async reg(userParams){
      let key = await ServerKey.model.findOne({msgCiphered: userParams.sign});
      //先验证签名
      if(key){
          let user = await User.model.findOne({username: userParams.username});
          if(user){
              return {
                type: "fail",
                msg: "USERNAME DUP",
                token: key.msgCiphered,
              }
          }
          //若是签名有效在用公钥解密密码
          let  password = decipher('aes192', userParams.sign, userParams.passowrd);  //使用签名解密


          try {
            //解密之后立刻删除这个token，
            await ServerKey.model.remove({msgCiphered: userParams.sign});


            let hashpassword = await bcrypt.hashSync(password, 10);

            console.log({hashpassword});

            let regRlt = await this.model.create({
                _id: mongoose.Types.ObjectId(),
               hashpassword,
              "username" : userParams.username,
              "createdAt": new Date(),
              'passwordSettled': true,

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
                type: "success",
                msg: "USER CREATE SUCCESS",
                token: key.msgCiphered,
            };

          } catch (err) {
              console.error(" in the User reg", err);
          }


      }else{
       
        return {
            type: "error",
            reason: "INVALID TOKEN",
        }
      }

    }

    static async current(token, uuid){
        let key = await ServerKey.model.findOne({msgCiphered: token, uuid});

        if(key){
            let user = await User.findOne(key.typeOption.userId);
            if(!user){
                return "LOGOUT USER";
            }
            return user;
        }
        return "INVALID USER";
    }

    static async pwdLogin(loginParams){
        let key = await ServerKey.model.findOne({msgCiphered: loginParams.sign});

        if(!key){
            return "INVALID TOKEN";
        }
        let  password = decipher('aes192', loginParams.sign, loginParams.passowrd);

        try {
             //解密之后立刻删除这个token，

            let user = await this.model.findOne({username: loginParams.username});

            if(!user){
                return {
                    type: "error",
                    reason: "USER EMPTY",
                    token: key.msgCiphered
                }
            }

            await ServerKey.model.remove({msgCiphered: loginParams.sign});

            let rlt  = await bcrypt.compare(password, user.hashpassword)
            if(rlt){
                let key = await ServerKey.genPublicKey
                (
                loginParams.uuid,
                "login",
                {
                    "loginDate": new Date(),
                    "userId": user._id,
                }
                , user.hashpassword
                );



                return {
                    type: "success",
                    msg: "LOGIN SUCCESS",
                    token: key.msgCiphered,
                };
            }else{
                let key = await ServerKey.genPublicKey
                (
                loginParams.uuid,
                "random",
                {
                   msg: "WRONG PASSWORD ONCE"
                }
                , user.hashpassword
                );
                return {
                    type: "error",
                    reason: "WRONG PASSWORD",
                    token: key.msgCiphered,
                }
            }
        } catch (error) {
            console.error(error);

        }

    }


}

User.setScheme(
    {
        "_id": String,
        "createdAt" : { type: Date, default: Date.now },
        "hashpassword": String,
        "passwordSettled": Boolean,
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
