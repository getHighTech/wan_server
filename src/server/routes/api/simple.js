import Router from 'koa-router';
import Products from '../../models/Products.js';
import BalanceIncome from '../../models/BalanceIncome.js';
//此乃模板代码
let simple = new Router().get('/api/v0/simple', async ( ctx )=>{
    ctx.body = "/api/v0/simple";
}).get('/api/v0/nomodel/simple/', async ( ctx )=>{
    ctx.body = "/api/v0/nomodel/simple/";

}).get('/api/v0/nomodel/simple/users/openid', async ( ctx )=>{
    ctx.body = "/api/v0/nomodel/simple/users/openid"
}).get('/api/v0/test', async ( ctx )=>{
    let income = await BalanceIncome.model.findOne({productId: {$exists: true}})
    .populate('productId', "name_zh")
    ctx.body = income;
})

export default simple;
