import ServerKey from "../models/ServerKey.js";

import  uuidv4 from 'uuid';
import ed25519 from 'ed25519';
import { decipher } from "../../both/ciphers.js";


export async function validToken(uuid, token){
    let key = await ServerKey.getPublicKeyByUUID(uuid);
    if(!key){
      
        return false;
    }else{
        let publicKey = key.publicKey;
        let randomString = key.randomString;
        let sign = key.sign;
        try {
            if(ed25519.Verify(Buffer.from(token), Buffer.from(sign), Buffer.from(publicKey))){
                // 验证函数返回了true，通过验证
                var msg = decipher('aes192', new Buffer(publicKey, 'utf8'), token);  //使用公钥解密
                if(msg === randomString) {
                    return true;
    
                }else{
                    return false;
                }
            }else{
               return false
            }
            
        } catch (error) {
            console.log(error);
            return false;
            
        }
        
        

        
        

    }

}


export async function validClient(ctx, next){
    if(ctx.request.url === "/api/v1/valid_token"){
        if(!ctx.query.uuid){
            ctx.body = {
                msg: "device error"
            }
            //说明此客户端非法
            return false;
        }
        if(!ctx.query.token){
            ctx.body = {
                msg: "token required"
            }
            //说明此客户端非法
            return false;
        }
        let uuid = ctx.query.uuid;
        let token = ctx.query.token;
        if(await validToken(uuid, token)){
            ctx.body = true;
        }else{
            ctx.body = false;
        }

            return false;


    }
    
    if(!ctx.request.url.includes("/api/v1/get_token")){
       //一般的api请求
        
         if(!ctx.query.uuid){
            ctx.body = {
                msg: "device error"
            }
            //说明此客户端非法
            return false;
        }
        if(!ctx.query.token){
            ctx.body = {
                msg: "token required"
            }
            //说明此客户端非法
            return false;
        }
        let uuid = ctx.query.uuid;
        let token = ctx.query.token;
        if(await validToken(uuid, token)){
            await next();
            return true;
        }else{
            ctx.body = {
                msg: "invalid api"
            };
        }
    }else{
        //开始向客户端发送token
        let uuid = null;
        let token = null;
        
        if(!ctx.query.uuid){
            ctx.body = {
                msg: "device error"
            }
            //说明此客户端非法
            return false;
        }else{
            uuid = ctx.query.uuid;
            //开始验证uuid在数据库是是否有
            let key = await ServerKey.getPublicKeyByUUID(uuid);
            if(!key){
                //若是没有就生成一个新的密钥对
                token = await ServerKey.genPublicKey(uuid, "random", {}, null);
                ctx.body = token
                return false;
            }else{
                //若是有就返回这个密钥对的公钥给用户
                ctx.body = key;
                return false;

            }
            
            
        }
       
       
    }
    
   
  }