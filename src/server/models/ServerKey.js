import randomString from 'random-string';
import crypto from 'crypto';
import ed25519 from 'ed25519';
import mongoose from 'mongoose';



import WanModel from "../core/model.js";
import { cipher } from '../../both/ciphers.js';



class ServerKey extends WanModel {
    constructor(props){
        super(props);
        this.collection = "server_keys";
    }
    static async genPublicKey(uuid, type, typeOption, hashPass){
        //hashPass一般传入用户的加密密码
        let password = null;
        if(hashPass){
            type = ""
            password = hashPass
        } else{
             password = randomString({length: 17});
        }

        var hash = crypto.createHash('sha256').update(password).digest();
        const serverKeyPair = ed25519.MakeKeypair(hash);
        const privateKey = serverKeyPair.privateKey;
        const publicKey = serverKeyPair.publicKey;
        let message = randomString({length: 17});

        let msgCiphered = cipher('aes192', publicKey, message);
        //公钥进行签名

        let signature = ed25519.Sign(new Buffer(msgCiphered, 'utf8'), privateKey);

        let roleName = "nobody";
        switch (type) {
            case "random":
                roleName = "nobody";
                break;
            case "regUsername":
                roleName = "loginedUser";

            case "login":
                roleName = "loginedUser";
        
            default:
                break;
        }

        
        //把密钥对存入数据库
        let serverkey = await new this.model({
            "_id": mongoose.Types.ObjectId(),
            password,
            uuid,
            privateKey,
            publicKey,
            randomString: message,
            sign: signature,
            msgCiphered,
            type, typeOption,
            roleName,
            createdAt: new Date()
        });

        await serverkey.save({
            _id: serverkey._id,
        });

        return {
             publicKey: publicKey,
             sign: signature,
             randomString: message,
             msgCiphered
        }

    }
    static decipherMsg(sign, msgCiphered, publicKey){
        if(ed25519.Verify(new Buffer(msgCiphered, 'utf8'), sign, publicKey)){
            // 验证函数返回了true，通过验证
           var msg = decipher('aes192', publicKey, msgCiphered);  //使用公钥解密
           expect(msg).to.be.equal(randomString);
           done();
       }
    }

    static async getPublicKeyByUUID(uuid){
        try {

            let key = await this.model.findOne({uuid}, 
                ["randomString", "roleName", "uuid", "publicKey", "type", "typeOption", "sign", "msgCiphered", "password", "privateKey"]);

           
            if(!await key){
                return false;
            }


            let outPut = {
                publicKey: key.publicKey,
                sign: key.sign,
                randomString: key.randomString,
                msgCiphered: key.msgCiphered,
                roleName: key.roleName,
            }
            return await outPut;

        } catch (error) {
            return console.error("find key by UUID", error);

        }

    }
    static async keyIsExpired(key){
        let expireTime = key.expireTime;
        if(!expireTime){
            expireTime = 1296000000; //默认15天
            
        }

        let keyTime = new Date(key.createdAt).getTime();
        let nowTime = new Date().getTime();
        if((keyTime+expireTime) >= nowTime){
            
            return true;
        }else{
            return false;
        }
    }

    static async validToken(uuid, sign){
        try {
            let key  = await this.getPublicKeyByUUID(uuid);
            if(!key){
                return "NO UUID EXIST? require again";
            }
            if(this.keyIsExpired(key)){
                await ServerKey.model.remove({uuid});

                return {
                    type: "error",
                    reason: "TOKEN_EXPIRED"
                }
            }


            if(
                ed25519.Verify(new Buffer(key.msgCiphered, 'utf8'), sign, new Buffer(key.publicKey, 'utf8'))
            ){
                // 验证函数返回了true，通过验证
           }else{
                return "INVALID API";
            }

        } catch (error) {
            console.error(error);
            return error;

        }
    }

}

ServerKey.setScheme(
    {
        "_id": String,
        "uuid": String,
        "privateKey": {
            type: Buffer
        },
        "publicKey": {
            type: Buffer
        },
        "password": String,
        "randomString": String,
        "msgCiphered": String,
        "sign": {
            type: Buffer
        },
        "type": String,
        "roleName": String,
        "typeOption": Object
    },
    "ServerKey", "server_keys"

)

export default  ServerKey;
