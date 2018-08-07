import Router from 'koa-router';
import User from '../models/User.js';

const APIFIXED = '/api/v1/';

export function  generateRestFul(collectionName, App, model){
    console.log('正在加载路由...');

    let rest = new Router();
    let apiWithCollection = APIFIXED + collectionName;

    rest.post(apiWithCollection, async ( ctx )=>{


        const {condition, page, pagesize, fields, sort} = ctx.request.body;

        // if(ctx.role_name === "nobody"){
        //     ctx.body = "access deny"
        // }

        if(!condition || typeof condition !== Object){
            ctx.body = "condition missing";
        }

        if(!page){
            ctx.body = "page missing"
        }

        if(!pagesize){
            ctx.body = "pagesize missing"
        }
        if(!fields || typeof fields !== Array){
            ctx.body = "fields missing"
        }
        if(!sort){
            ctx.body = "sort missing"
        }


        let records = await model.model.find(condition, fields).sort(sort).skip((page-1)*pagesize).limit(parseInt(pagesize, 10));
        return ctx.body = {
            type: collectionName,
            status: "success",
            records,
        };


    }).put(apiWithCollection+"/create", async ( ctx )=>{
        if(collectionName === "users"){
            ctx.body = "this is api canceled, please use /users/user_reg"
        }
        let record =  await model.model.findById(ctx.params.id);

        ctx.body = record;
    }).patch(apiWithCollection+"/update", async ( ctx )=>{
        console.log(ctx.params);

        ctx.body = ctx.query;
    }).delete(apiWithCollection+"/delete", async (ctx)=> {

    }).get(apiWithCollection+"/get/:id", async ctx => {

    })

    //处理例外的路由
    if(collectionName === "users"){
        rest.post(APIFIXED+"user_login", ctx => {
            console.log(ctx.role_name);
            ctx.body = ctx.role_name;


        }).put(APIFIXED+"user_reg", async ctx => {
            console.log(ctx.request.body);
            
            return ctx.body = await User.reg(ctx.request.body);
            

        }).get("current_user",async ctx=>{
            try {
                return await User.current(ctx.query.token, ctx.query.uuid);


            } catch (error) {
                return {
                    type: "error",
                    reason: error
                }
            }


        })
    }



    // 加载路由中间件
    App.use(rest.routes()).use(rest.allowedMethods())
    console.log('路由加载完毕');

}
