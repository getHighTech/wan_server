import Router from 'koa-router';
import Order from '../../models/Order.js';
const  ApiRoute = new Router();

  

ApiRoute.get('/api/order/status', async ( ctx )=>{
//这是临时的借口
    try{
        const {userId, status } = ctx.query
        console.log(userId)
        console.log(status)
        const order = await Order.find({userId,status}).skip(0).limit(10).sort({createdAt: -1})
        ctx.body = {
            order,
        }
    } catch (err) {
        ctx.body = {
            msg: 'fail'
        }
    }
})

export default ApiRoute;
