mport config from './wanchehui.config.js';
import  tenpay from 'tenpay';
import Router from 'koa-router';
import urlencode from 'urlencode';
import Axios from 'axios'
import OrderDeal from '../models/OrderDeal.js';


const wechatApi = new tenpay(config);

const app_secrect = "9f22e4512d30fd774d93defa85c3282b";


function ShowAppName(appname){
    switch (appname) {
          case "wanrenchehui":
                  
                  return "付款给万人车汇";

                      case "xianzhi":
                        return "付款给鲜至臻品";
                            default:
                              return "付款给万人车汇";
                                }
}


export default function genenrateWechatApis(App){

    let rest = new Router();

      rest.get('/api/v1/wechat/access/token', async ( ctx )=>{
            let rlt  = await Axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appid}&secret=${app_secrect}`)
            ctx.body = rlt.data;

        })
        .get('/api/v1/wechat', async ( ctx )=>{

            })
          .get('/api/v1/wechat/openid/getstatus', async ( ctx )=>{

              })
            .post('/api/v1/wechat/pay/notify', async ( ctx )=>{
                   let postData = ctx.request.body;
                        if(!postData.xml){

                                 return false;
                                      }

                             if(!postData.xml.out_trade_no){

                                      
                                      return false;
                                           }else{
                                                    //将订单加入队列并且处理
                                                    //       OrderDeal.join( postData.xml.out_trade_no[0]);
                                                    //            }
                                                    //
                                                    //                 console.log(postData.xml);
                                                    //                   }):wq
                                                    //                     .get('/api/v1/wechat/payback/show', async ( ctx )=>{
                                                    //                         let uresult = await wechatApi.unifiedOrder({
                                                    //                               out_trade_no: ctx.query.order,
                                                    //                                     body: ShowAppName(ctx.query.appname),
                                                    //                                           total_fee: ctx.query.fee,
                                                    //                                                 openid: ctx.query.openid
                                                    //                                                     });
                                                    //                                                         let result = await wechatApi.getPayParamsByPrepay({
                                                    //                                                                 prepay_id: uresult.prepay_id,
                                                    //                                                                       });
                                                    //
                                                    //                                                                           console.log(result);
                                                    //                                                                               console.log(ctx.query.appname);
                                                    //                                                                                   await ctx.render("wechatpay", {
                                                    //                                                                                         ...result,
                                                    //                                                                                               appname: ctx.query.appname,
                                                    //                                                                                                     appTitle: ShowAppName(ctx.query.appname)
                                                    //                                                                                                         })
                                                    //                                                                                                           });
                                                    //                                                                                                             // 加载路由中间件
                                                    //                                                                                                               App.use(rest.routes()).use(rest.allowedMethods());
                                                    //
                                                    //                                                                                                               }
                                                    //
