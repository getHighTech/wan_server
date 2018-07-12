import config from './wanchehui.config.js';
import  tenpay from 'tenpay';
import request from 'request';
import Router from 'koa-router';
import urlencode from 'urlencode';
import Axios from 'axios'

import WeChatUser from '../models/WeChatUser.js';

const wechatApi = new tenpay(config);
const appName = "wanchehui";
const redirect_uri = urlencode("")

const app_secrect = "9f22e4512d30fd774d93defa85c3282b";


export default function genenrateWechatApis(App){

  let rest = new Router();

  rest.get('/api/v1/wechat/access/token', async ( ctx )=>{
    let rlt  = await Axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appid}&secret=${app_secrect}`)
    ctx.body = rlt;

  })
  .get('/api/v1/wechat', async ( ctx )=>{

  })
  .get('/api/v1/wechat/openid/getstatus', async ( ctx )=>{

  })
  .post('/api/v1/wechat/pay/notify', async ( ctx )=>{
     let postData = ctx.request.body;

     console.log(postData);
  })
  .get('/api/v1/wechat/payback/show', async ( ctx )=>{
    let uresult = await wechatApi.unifiedOrder({
      out_trade_no: (new Date()).getTime(),
      body: '万人车汇付款测试',
      total_fee: ctx.query.fee,
      openid: ctx.query.openid
    });
    let result = await wechatApi.getPayParamsByPrepay({
        prepay_id: uresult.prepay_id,
      });

    console.log(result);
    await ctx.render("wechatpay", {
      ...result,
      appname: ctx.query.appname
    })
  });
  // 加载路由中间件
  App.use(rest.routes()).use(rest.allowedMethods());

}
