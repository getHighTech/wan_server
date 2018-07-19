import ServerKey from "../models/ServerKey.js";
import  uuidv4 from 'uuid';
export async function validClient(ctx, next){
    
    if(!ctx.request.url.includes("/api/v1/get_token")){
       
        
        if(ctx.query.token){
            //开始验证token消息
            //如果有， 就验证这个token解密后，是否和publicKey一致，并且验证签名，解密密文，判断是否和数据库明文一致，
             //若是都一致， 就放行路由
            next();
        }else{
            //没有得到token，此api非法
            
            ctx.body = {
                msg: "invalid api"
            }
    
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
            let key = await ServerKey.getPublicKeyByUUid(uuid)
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