import randomString from 'random-string';
import crypto from 'crypto';
import ed25519 from 'ed25519';




import WanModel from "../core/model.js";



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
        
        var hash = crypto.createHash('sha256').update(secret_key).digest();
        const serverKeyPair = ed25519.MakeKeypair(hash);
        const privateKey = serverKeyPair.privateKey;
        const publicKey = serverKeyPair.publicKey;
        let message = randomString({length: 17});
        let msgCiphered = cipher('aes192', privateKey, message); 

        //私钥进行签名

        let signature = ed25519.Sign(new Buffer(msgCiphered, 'utf8'), privateKey); 
        //把密钥对存入数据库
        let rltId = await this.model.create({
            password,
            uuid,
            privateKey,
            publicKey,
            randomString: message,
            type, typeOption
        });

        console.log(rltId);
       
        
        return {
             publicKey: publicKey,
             sign: signature,
             randomString: message,
        }
    
    }
}

User.setScheme(
    {
        "uuid": String,
        "privateKey": String,
        "publicKey": String,
        "password": String,
        "type": String,
        "typeOption": Object
    },
    "ServerKey", "server_keys"

)

export default  User;
