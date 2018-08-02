import Router from 'koa-router';
import MobileSMS from '../../models/MobileSMS.js';

const  mobile_sms_route = new Router();

  

mobile_sms_route.get('/api/v1/get_mobile_sms', async ( ctx )=>{
    const { mobile }  = ctx.query;
    if(!mobile){
        ctx.body = "MOBILE MISSING";
        return false;
    }
    let rlt  = await MobileSMS.getMobileSMS(mobile);
    ctx.body = rlt;
})

export default mobile_sms_route;