import Router from 'koa-router';
import request from 'request';
import Axios from 'axios'
const  approute = new Router();

const app_secrect = "9f22e4512d30fd774d93defa85c3282b";
const app_id = "wx9ca3272fed4926ba";
approute.get('/app/:appname/:from_url', async ( ctx )=>{
    let from_url = ctx.params.from_url ? ctx.params.from_url : "";
    if(!ctx.query.code){
      await ctx.render('app', {
        appname: ctx.params.appname,
        openid: null,
        from_url
      })
    }else{
      Axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${app_id}&secret=${app_secrect}&code=${ctx.query.code}&grant_type=authorization_code`)
      .then(res=>{
        console.log(res.data);
        ctx.render('app', {
          appname: ctx.params.appname,
          openid: res.data.openid,
          from_url,
        })
      }).catch(err=>{
        console.log(err);

      })


    }

})

export default approute;
