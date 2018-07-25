import Router from 'koa-router';
import Order from '../../models/Order.js';
import Shop from '../../models/Shop.js';
import BalanceIncome from '../../models/BalanceIncome.js';
import Balance from '../../models/Balance.js';
import BalanceCharge from '../../models/BalanceCharge.js';
import Agency from '../../models/Agency.js';
// import User from '../../models/User.js'

import moment from "moment"
const  ApiRoute = new Router();

  

ApiRoute.get('/api/order/status', async ( ctx )=>{
//这是临时的借口
console.log(`11111`)
    try{
        const {userId, status } = ctx.query
        console.log(userId)
        console.log(status)
        const order = await Order.find({userId,status}).skip(0).limit(10).sort({createdAt: -1})
        ctx.body = {
            order,
        }
    } catch (err) {
        ctx.body = {
            msg: 'fail'
        }
    }
})

ApiRoute.get('/api/shop', async ( ctx )=>{ 
    const {userId, unit, rangeLength  } = ctx.query
    let yestoday = moment().subtract(rangeLength, unit);
    yestoday = yestoday.toISOString();
    let yestodayInData = new Date(yestoday);
    let incomes = await  BalanceIncome.find({createdAt: {'$gte':yestodayInData,'$lt':new Date()}, userId});
    let totalAmount = 0;
    for(let i =0; i<incomes.length; i++)
    {
        totalAmount+=income.amount
    }
    console.log(typeof(incomes))
    console.log(incomes)
   ctx.body = {
        incomes, 
        totalAmount,
        unit
   }
})


ApiRoute.get('/api/loadMoney', async ( ctx )=>{ 
    console.log(`loadMoney`)
    // try{
        const {userId} = ctx.query
        console.log(userId)
        ctx.body = {
            userId
        }
        // console.log(`${userId}`)
        // let balance = await Balance.findOne({userId});
        // let balance_incomes = await BalanceIncome.find({userId}).skip(0).limit(10).sort({createdAt: -1})
        // let balance_charges = await BalanceCharge.find({userId}).skip(0).limit(10).sort({createdAt: -1})
        // let agencies = [];
        // let users = [];
        // // //数据结构兼容，之后可以删除
        // let incomeNeedToUpdate = false;
        // for(let i=0;i<balance_incomes.length;i++) {
        //     console.log(123)
        //     // if(!balance_incomes.i.balanceId){
        //     //     await BalanceIncome.where({_id: balance_incomes.i._id }).update({
        //     //         balanceId: balance._id
        //     //     })
        //     //     incomeNeedToUpdate = true;
        //     // }

        //     // if(balance_incomes.i.userId){
        //     //     users.push(await User.findOne({_id: balance_incomes.i.userId}))
        //     // }
        //     // if(balance_incomes.i.agency) {

        //     // }
        // }
        
        // // //======================支出更新完毕
        // ctx.body = {
        //     balance,
        //     balance_incomes,
        //     balance_charges,
        // }
    // } catch (err) {
    //     ctx.body = {
    //         msg: 'fail'
    //     }
    // }
   
})


// ApiRoute.get('/api/test', async ( ctx )=>{
//     // try{
//         // const {userId} = ctx.query
//         // // console.log(`${userId}`)
//         // let balance = await Balance.findOne({userId});
//         // let balance_incomes = await BalanceIncome.find({userId}).skip(0).limit(10).sort({createdAt: -1})
//         // let balance_charges = await BalanceCharge.find({userId}).skip(0).limit(10).sort({createdAt: -1})
//         // let agencies = [];
//         // let users = [];
//         // //数据结构兼容，之后可以删除
//         // let incomeNeedToUpdate = false;
//         // for(let i=0;i<balance_incomes.length;i++) {
//         //     if(!balance_incomes.i.balanceId){
//         //         await BalanceIncome.where({_id: balance_incomes.i._id }).update({
//         //             balanceId: balance._id
//         //         })
//         //         incomeNeedToUpdate = true;
//         //     }

//         //     if(balance_incomes.i.userId){
//         //         users.push(await User.findOne({_id: balance_incomes.i.userId}))
//         //     }
//         //     if(balance_incomes.i.agency) {

//         //     }
//         // }
        
//         // //======================支出更新完毕
//         // ctx.body = {
//         //     balance,
//         //     balance_incomes,
//         //     balance_charges,
//         // }
//     // } catch (err) {
//     //     ctx.body = {
//     //         msg: 'fail'
//     //     }
//     // }
// })

export default ApiRoute;
