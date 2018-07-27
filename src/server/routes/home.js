import Router from 'koa-router';

const  homeRoute = new Router();

  

homeRoute.get('/', async ( ctx )=>{
    console.log(123);
    
    await ctx.render('index.html')

})

export default homeRoute;