import Router from 'koa-router';

const  homeRoute = new Router();

  

homeRoute.get('/', async ( ctx )=>{
    await ctx.render('index.html')

})

export default homeRoute;