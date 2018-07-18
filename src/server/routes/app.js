import Router from 'koa-router';
import Axios from 'axios'
import  decode from 'urldecode'
const  approute = new Router();


const app_secrect = "9f22e4512d30fd774d93defa85c3282b";
const app_id = "wx9ca3272fed4926ba";
approute.get('/app/getopenid/:from_url', async ( ctx )=>{
    let from_url = ctx.params.from_url ? ctx.params.from_url : "http://test2.10000cars.cn";
    await ctx.render('getopenid', {
      from_url
    })

})
.get('/app/goto/:appname', async (ctx) => {
  if(ctx.query.openid){
    console.log(openid);
  }
  await ctx.render('app', {
    openid: ctx.query.openid,
    appname: ctx.params.appname
  })
})
.get("/app/getopenid/:from_url/back", async (ctx) => {
  let from_url = ctx.params.from_url ? ctx.params.from_url : "http://test2.10000cars.cn";

  let res = await Axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${app_id}&secret=${app_secrect}&code=${ctx.query.code}&grant_type=authorization_code`)
  console.log(res.data);
  console.log("from_url", from_url);
  console.log("decode.url",decode(from_url));
  await ctx.render('getopenid_back', {
    openid: res.data.openid,
    from_url: decode(from_url)
  })

})

export default approute;
