import Router from 'koa-router';
import Axios from 'axios'
import  decode from 'urldecode';
import urlencode from 'urlencode';
const  approute = new Router();


const app_secrect = "02938e071aae51a7b59b7fe6f627a681";
const app_id = "wx0564668ed5671740";
approute.get('/app/getopenid/:from_url', async ( ctx )=>{
    let from_url = ctx.params.from_url ? ctx.params.from_url : "http://xianzhi.10000cars.cn";
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
  let from_url = ctx.params.from_url ? ctx.params.from_url : "http://xianzhi.10000cars.cn";

  let res = await Axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${app_id}&secret=${app_secrect}&code=${ctx.query.code}&grant_type=authorization_code`)
  console.log(res.data)
  console.log(res.data['openid']);
	let openid = res.data['openid'];
	let url = decode(from_url)+"&openid="+res.data['openid'];
	if(!openid){
		url = '/app/getopenid/'+urlencode(from_url);
	}	
  await ctx.render('getopenid_back', {
	url
  })

})

export default approute;
