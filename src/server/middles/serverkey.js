import ServerKey from "../models/ServerKey.js";
import  uuidv4 from 'uuid';
export async function validClient(ctx, next){
    if(ctx.request.url !== "/api/v1/get_token"){
       
        
        if(ctx.query.token){
            //开始验证token消息
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
        
        if(!ctx.query.uuid){
            uuid = uuidv4().v4;
        }else{
            uuid = ctx.query.uuid;
        }
        let token = await ServerKey.genPublicKey(uuid, "random", {}, null);
        ctx.body = token
    }
    
   
  }