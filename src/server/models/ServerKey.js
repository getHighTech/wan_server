import randomString from 'random-string';
import crypto from 'crypto';
import ed25519 from 'ed25519';




import WanModel from "../core/model.js";
import { cipher } from '../../both/ciphers.js';



class ServerKey extends WanModel {
    constructor(props){
        super(props);
        this.collection = "ServerKey";
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
        console.log("33", message);
        
        let msgCiphered = cipher('aes192', publicKey, message); 
        //公钥进行签名

        let signature = ed25519.Sign(new Buffer(msgCiphered, 'utf8'), privateKey); 

        
        //把密钥对存入数据库
        await this.model.create({
            password,
            uuid,
            privateKey,
            publicKey,
            randomString: message,
            sign: signature,
            msgCiphered,
            type, typeOption,
            createdAt: new Date()
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
            
            let key = await this.model.findOne({uuid});
            
            if(!await key){
                return false;
            }
             
            
            let outPut = {
                publicKey: key.publicKey,
                sign: key.sign,
                randomString: key.randomString,
                msgCiphered: key.msgCiphered
            }
            return await outPut;
            
        } catch (error) {
            return console.error("find key by UUID", error);
            
        }
        
    }

    static async validToken(uuid, sign){
        try {
            let key  = await this.getPublicKeyByUUID(uuid);
            if(!key){
                return "NO UUID EXIST? require again";
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
        "typeOption": Object
    },
    "ServerKey", "server_keys"

)

export default  ServerKey;
