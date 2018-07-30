import Router from 'koa-router';

const APIFIXED = '/api/v1/';

export function  generateRestFul(collectionName, App, model){
    console.log('正在加载路由...');

    let rest = new Router();
    let apiWithCollection = APIFIXED + collectionName;

    rest.post(apiWithCollection, async ( ctx )=>{
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


    }).get(apiWithCollection, async ( ctx )=>{
        let record =  await model.model.findById(ctx.params.id);

        ctx.body = record;
    }).patch(apiWithCollection, async ( ctx )=>{
        console.log(ctx.params);

        ctx.body = ctx.query;
    }).delete(apiWithCollection, async (ctx)=> {

    }).put(apiWithCollection, async ctx => {

    })

    //处理例外的路由
    if(collectionName === "users"){
        rest.post(APIFIXED+"user_login", ctx => {

        }).post(APIFIXED+"user_reg", ctx => {

        })
    }



    // 加载路由中间件
    App.use(rest.routes()).use(rest.allowedMethods())
    console.log('路由加载完毕');

}
