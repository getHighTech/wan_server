import config from './wanchehui.config.js';
import  tenpay from 'tenpay';
import request from 'request';
import urlencode from 'urlencode';
import Router from 'koa-router';
const wechatApi = new tenpay(config);
const appName = "wanchehui";
const redirect_uri = urlencode("")




export default function genenrateWechatApis(App){

  let rest = new Router();

  rest.get('/api/v1/wechat/openid/get/', async ( ctx )=>{
    let redirect_uri = ctx.request.url+'code';
    var options = {
        url: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`,
        headers: {
          'User-Agent': 'request',
          'Accept': 'text/html'
        }
      };
    ctx.body = await request.get(options,
        (err, response, body)=>{
          console.log(body);

      })

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
