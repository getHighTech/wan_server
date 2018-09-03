import Router from 'koa-router';
import Balance from '../../models/Balance.js';
import moment from 'moment';
import BalanceIncome from '../../models/BalanceIncome.js';
import BalanceCharge from '../../models/BalanceCharge.js';
//此乃模板代码
let   money = new Router().get('/api/v0/my_incomes', async ( ctx )=>{
    let page = parseInt(ctx.query.page? ctx.query.page : 1);
    let pagesize  = parseInt(ctx.query.pagesize? ctx.query.pagesize : 10);
    console.log(pagesize);
    let appName = ctx.query.appName;
    let userId = ctx.query.userId? ctx.query.userId: null;
    if(!userId){
        return ctx.body = "require login"
    }
    try {
        let balance_incomes = await BalanceIncome.model
        .find({userId,appName})
        .skip(pagesize*(page-1))
        .limit(pagesize)
        .sort({createdAt: -1}).populate('agency', "username").populate('productId', "name_zh").populate('userId', "username")
        ctx.body = {
            balance_incomes,
        };
    } catch (error) {
        console.log(error);
        
    }
   
    
    
}).get('/api/v0/my_balance', async ( ctx )=>{
    try {
        let userId = ctx.query.userId? ctx.query.userId: null;
        let appName = ctx.query.appName;
        if(!userId){
            return ctx.body = "require login"
        }
        
    
        let balance = await Balance.model.findOne({userId,appName})
        .populate('userId', "username")
        ctx.body = balance;
        
    } catch (error) {
        ctx.body = {
            error,
        }
    }
   
   
    
    
}).get('/api/v0/my_charge', async ( ctx )=>{
    let page = ctx.query.page? ctx.query.page : 1;
    let pagesize  = ctx.query.pagesize? ctx.query.pagesize : 10;
    let userId = ctx.query.userId? ctx.query.userId: null;
    let appName = ctx.query.appName;
    if(!userId){
        return ctx.body = "require login"
    }
    
    
    ctx.body = {
        page,
        pagesize,
        userId
    };
})
.get('/api/v0/my_statics', async ( ctx )=>{

    let userId = ctx.query.userId? ctx.query.userId: null;
     let appName = ctx.query.appName;
    if(!userId){
        return ctx.body = "require login"
    }

    try{
        
        let yestoday = moment().subtract(1, "days");
        yestoday = yestoday.toISOString();
        let yestodayInData = new Date(yestoday);
        let yestodayIncomes = await  BalanceIncome.model.find({createdAt: {'$gte':yestodayInData,'$lt':new Date()}, userId});
        let yestodayTotalAmount = 0;
        for(let i =0; i<yestodayIncomes.length; i++)
        {
            yestodayTotalAmount+=yestodayIncomes.amount
        }


        let week = moment().subtract(1, "weeks");
        week = week.toISOString();
        let weekInData = new Date(week);
        let weekIncomes = await  BalanceIncome.model.find({createdAt: {'$gte':weekInData,'$lt':new Date()}, userId});
        let weekTotalAmount = 0;
        for(let i =0; i<weekIncomes.length; i++)
        {
            weekTotalAmount+=weekIncomes.amount
        }



        let months = moment().subtract(1, "months");
        months = months.toISOString();
        let monthsInData = new Date(months);
        let monthsIncomes = await  BalanceIncome.model.find({createdAt: {'$gte':monthsInData,'$lt':new Date()}, userId});
        let monthsTotalAmount = 0;
        for(let i =0; i<monthsIncomes.length; i++)
        {
            monthsTotalAmount+=monthsIncomes.amount
        }

        ctx.body = {
            yestodayTotalAmount,
            weekTotalAmount,
            monthsTotalAmount,
        }
    } 
    catch(error) {
        console.log(error);
        
        ctx.body = {
            error
        }
    }
})

export default money;
