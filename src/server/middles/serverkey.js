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
        ctx.body = {
            publicKey: "公钥",
            sign: '签名',
            randomString: "随机加密的内容"
        }
    }
    
   
  }