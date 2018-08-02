import Router from 'koa-router';
//此乃模板代码
let simple = new Router().get('/api/v0/simple', async ( ctx )=>{
    ctx.body = "/api/v0/simple";
}).get('/api/v0/nomodel/simple/', async ( ctx )=>{
    ctx.body = "/api/v0/nomodel/simple/";

}).get('/api/v0/nomodel/simple/users/openid', async ( ctx )=>{
    ctx.body = "/api/v0/nomodel/simple/users/openid"
})

export default simple;
