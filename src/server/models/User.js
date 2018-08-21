import WanModel from "../core/model.js";

import ServerKey from './ServerKey.js';
import {decipher, cipher} from '../../both/ciphers.js';

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
              "passwordSettled": true,

            });



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
                optional: {
                    userId: regRlt._id
                }
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

    static async mobileLogin(loginParams){
        let key = await ServerKey.model.findOne({msgCiphered: loginParams.sign});

        if(!key){
            return "INVALID TOKEN";
        }
        let  sms = decipher('aes192', loginParams.sign, loginParams.sms);

        try {
             //解密之后立刻删除这个token，

            let user = await this.model.findOne({username: loginParams.mobile});
            let mobileUser = await this.model.findOne({"profile.mobile": loginParams.mobile});


            if(user || mobileUser){
                //用户名就是手机号的用户
                let dealUser = user;
                if(!dealUser){
                    dealUser = mobileUser;
                }
                if(await MobileSMS.validUserSMS(loginParams.sms, loginParams.mobile)){
                    let key = await ServerKey.genPublicKey
                    (
                    loginParams.uuid,
                    "login",
                    {
                        "loginDate": new Date(),
                        "userId": dealUser._id,
                    }
                    , dealUser.hashpassword
                    );
                    let optional = null;
                    if(!dealUser.passwordSettled){

                        optional = "need to reset password";
                    }
                    return  {
                        type: "success",
                        msg: "LOGIN SUCCESS",
                        token: key.msgCiphered,
                        optional,
                    };
                }else{
                    let key = await ServerKey.genPublicKey
                    (
                    loginParams.uuid,
                    "random",
                    {
                    msg: "WRONG SMS ONCE"
                    }
                    , user.hashpassword
                    );
                    return {
                        type: "error",
                        reason: "SMS INVALID",
                        token: key.msgCiphered
                    }

                }

            }else{
                //不存在的用户要新建
                let passowrd = cipher('aes192', token, "112!!@358#%*");
                try {
                    let regRlt = await this.reg(
                        {
                            username: loginParams.mobile,
                            profile: {
                                mobile: loginParams.mobile,
                            },
                            passowrd,
                            sign: token,
                            uuid
                          }
                    );
                    let optional = null;
                    if(regRlt.optional.userId){
                        let user = await this.model.findOne({_id: regRlt.optional.userId});
                        if(user.passwordSettled){
                            await this.model.update({_id: regRlt.optional.userId}, {
                                passwordSettled: false,
                            })
                            optional = "need to reset password";
                        }
                    }

                    let key = await ServerKey.genPublicKey
                    (
                    loginParams.uuid,
                    "reg",
                    {
                        "loginDate": new Date(),
                        "userId": regRlt._id,
                    }
                    , dealUser.hashpassword
                    );
                    return  {
                        type: "success",
                        msg: "REG SUCCESS",
                        token: key.msgCiphered,
                        optional
                    };

                } catch (error) {
                    return error;
                }


            }

            await ServerKey.model.remove({msgCiphered: loginParams.sign});


        } catch (error) {
            console.error(error);

        }
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
        "name":String,
        "dataAutograph" : String,
        "passwordSettled": Boolean,
        "profile": Object
    },
    "User", "users"

)

export default  User;
