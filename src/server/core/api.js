import Router from 'koa-router';

export function  generateRestFul(collectionName, App, model){
    console.log('正在加载路由...');
    let rest = new Router()


    rest.get('/api/v1/'+collectionName, async ( ctx )=>{
        let page = 1;
        let pagesize = 10;
        console.log(ctx.query);

        if(ctx.query.page ){
            page = ctx.query.page;
        }

        if(ctx.query.pagesize){
            pagesize = ctx.query.pagesize;
        }
        let records = await model.model.find({}).sort({createdAt: -1}).skip((page-1)*pagesize).limit(parseInt(pagesize, 10));
        ctx.body = records

    }).get('/api/'+collectionName+'/:id', async ( ctx )=>{
// <<<<<<< HEAD
//         console.log(ctx.params.id);
//         let record =  await model.findById(ctx.params.id);
//         console.log('25------------------');
//         console.log(record);
// =======
        console.log('29==========================');
        console.log(ctx.params.id);

        let record =  await model.model.findOne({username:ctx.params.id});
        console.log(record.data);

        console.log('34_______________________________________-'+record.auth_cards);
        ctx.body = record;
    }).get('/api/v1/'+collectionName+'/:id/update', async ( ctx )=>{
        console.log(ctx.params);

        ctx.body = ctx.query;
    })

    // 加载路由中间件
    App.use(rest.routes()).use(rest.allowedMethods())
    console.log('路由加载完毕');

}
