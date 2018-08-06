import Router from 'koa-router';
import User from '../models/User';

const APIFIXED = '/api/v1/';

export function  generateRestFul(collectionName, App, model){
    console.log('正在加载路由...');
    let rest = new Router();
    let apiWithCollection = APIFIXED + collectionName;
    
    rest.post(apiWithCollection, async ( ctx )=>{
        console.log(ctx.request.body);
        
        const {condition, page, pagesize, fields, sort} = ctx.request.body;

        // if(ctx.role_name === "nobody"){
        //     ctx.body = "access deny"
        // }
        console.log(typeof condition);
        
        if(!condition || typeof condition !== "object"){
            return ctx.body = {
                type: "error",
                reason:  "condition missing"
            };
        }

        if(!page){
            return ctx.body = {
                type: "error",
                reason: "page missing"
            }
        }

        if(!pagesize){

            return ctx.body = {
                type: "error",
                reason: "pagesize missing"
            }
            return ctx.body = "pagesize missing"
        }
        
        if(!fields || typeof fields !== "object"){
            return ctx.body = {
                type: "error",
                reason: "fields missing"
            }
        }
        if(!sort){
            return ctx.body = {
                type: "error",
                reason: "sort missing"
            }
        }
        

        try {
            let records = await model.model.find(condition, fields).sort(sort).skip((page-1)*pagesize).limit(parseInt(pagesize, 10));
            return ctx.body = {
                type: collectionName,
                status: "success",
                records
            };
            
        } catch (error) {
            return ctx.body = {
                type: "error",
                reason: error
            }
        }
      
        

    }).put(apiWithCollection+"/create", async ( ctx )=>{
        if(collectionName === "users"){
            return ctx.body = {
                type: "error",
                reason:"this is api canceled, please use /users/user_reg"
            }
        }
        let record =  await model.model.findById(ctx.params.id);
        
        return ctx.body = {
            type: collectionName,
            status: "success",
            record
        };

    }).patch(apiWithCollection+"/update", async ( ctx )=>{
        const {condition, set} = ctx.request.body;

        // if(ctx.role_name === "nobody"){
        //     ctx.body = "access deny"
        // }

        if(!condition || typeof condition !== "object"){
            return ctx.body = "condition missing";
        }


        if(!set){
            return ctx.body = "sort missing"
        }
        
      
        let msg = await model.model.update(condition, {
            $set: ctx.body.set
        });

        return ctx.body = {
            type: collectionName,
            status: "success",
            msg
        };

    }).delete(apiWithCollection+"/delete", async (ctx)=> {

    }).get(apiWithCollection+"/get/:id", async ctx => {

    })

    //处理例外的路由
    if(collectionName === "users"){
        rest.post(APIFIXED+"user_login", async ctx => {
            try {
                
                let rlt = await User.pwdLogin(ctx.request.body);
                return ctx.body = rlt;
                
            } catch (error) {
                return ctx.body = {
                    type: "error",
                    reason: error
                }
            }
        }).put(APIFIXED+"user_reg", async ctx => {
            console.log("用户注册路由");
            
            try {
                console.log("输入的注册参数", ctx.request.body);

                let rlt = await User.reg(ctx.request.body);
                return ctx.body = rlt;
            } catch (error) {
                return ctx.body = {
                    type: "error",
                    reason: error
                }
            }

        }).put(APIFIXED+"user_mobile_login",async  ctx => {
            try {
                let rlt = await User.mobileLogin(ctx.request.body);
                return ctx.body = rlt;
            } catch (error) {
                return ctx.body = {
                    type: "error",
                    reason: error
                }
            }

        }).get("current_user",async ctx=>{
            try {
                let rlt =  await User.current(ctx.query.token, ctx.query.uuid);
                return ctx.body = rlt;
                
            } catch (error) {
                return ctx.body = {
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