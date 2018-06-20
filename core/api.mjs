import Router from 'koa-router';

export function  generateRestFul(collectionName, App, model){
    console.log('正在加载路由...');
    let rest = new Router()

    // 子路由1
    rest.get('/'+collectionName+'/', async ( ctx )=>{
        let record = await model.findOne({username: "18820965455"});
        console.log(record);
        
        ctx.body = '/'+collectionName+'/';
    }).get('/'+collectionName+'/:id', async ( ctx )=>{
        let record =  await model.findById(ctx.params.id);
        console.log(record);
        
        ctx.body = record;
    }).get('/'+collectionName+'/:id/update', async ( ctx )=>{
        console.log(ctx.params);
    
        ctx.body = ctx.query;
    })

    // 加载路由中间件
    App.use(rest.routes()).use(rest.allowedMethods())
    console.log('路由加载完毕');

}