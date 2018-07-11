import config from './wanchehui.config.js';
import  tenpay from 'tenpay';
import request from 'request';
import Router from 'koa-router';
import urlencode from 'urlencode';

import WeChatUser from '../models/WeChatUser.js';

const wechatApi = new tenpay(config);
const appName = "wanchehui";
const redirect_uri = urlencode("")




export default function genenrateWechatApis(App){

  let rest = new Router();

  rest.get('/api/v1/wechat/user/openid/:openid', async ( ctx )=>{
      if(!ctx.params.openid){
        return "OPENID REQUIRED"
      }
      let user = await WeChatUser.getUserByOpenid(ctx.params.openid);
      return user;

  })
  .get('/api/v1/wechat/openid/get/code', async ( ctx )=>{

  })
  .get('/api/v1/wechat/openid/getstatus', async ( ctx )=>{

  })
  .get('/api/v1/wechat/:openid/pay', async ( ctx )=>{

  })
  .get('/api/v1/wechat/payback', async ( ctx )=>{

  });
  // 加载路由中间件
  App.use(rest.routes()).use(rest.allowedMethods());

}
