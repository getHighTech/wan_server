import Router from 'koa-router';
import request from 'request';
const  approute = new Router();

const app_secrect = "9f22e4512d30fd774d93defa85c3282b";
const app_id = "wx9ca3272fed4926ba";
approute.get('/app/:appname', async ( ctx )=>{
    let from_url = ctx.query.from_url ? ctx.query.from_url : "";
    if(!ctx.query.code){
      await ctx.render('app', {
        appname: ctx.params.appname,
        openid: null,
        from_url: null
      })
    }else{
      await request.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${app_id}&secret=${app_secrect}&code=${ctx.query.code}&grant_type=authorization_code`, async (err, response, body)=>{
        console.log(body);
        await ctx.render('app', {
          appname: ctx.params.appname,
          from_url,
          openid: body.openid,
        })
      })

    }

})

export default approute;
