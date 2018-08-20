import Router from 'koa-router';
import { getOrderStatus } from '../../controllers/order.js';
import { wechatAuth } from '../../controllers/wechat.js';
import { getTeam  } from '../../controllers/myTeam.js';
import { getShopProducts, porudctsWarehouse, sellingProduct } from '../../controllers/product.js';
import { getBankcards } from '../../controllers/bankcard.js';
import { getPeriodIncome } from '../../controllers/balanceIncome.js';
import { loadMoney } from '../../controllers/balance.js';
import moment from "moment"
const  ApiRoute = new Router();
ApiRoute.get('/api/info', wechatAuth)
ApiRoute.get('/api/order/status',getOrderStatus)
ApiRoute.get('/api/myteam',getTeam)
ApiRoute.get('/api/products',getShopProducts)
ApiRoute.get('/api/my/bankcards',getBankcards)
ApiRoute.get('/api/new_add_products',porudctsWarehouse)
ApiRoute.get('/api/selling_product',sellingProduct)
ApiRoute.get('/api/shop',getPeriodIncome)
ApiRoute.get('/api/loadMoney',loadMoney)
// ApiRoute.get('/api/loadMoney', async ( ctx )=>{
//     const {userId} = ctx.query
//     // console.log(`${userId}`)
//     let balance = await Balance.model.findOne({userId});
//     let balance_incomes = await BalanceIncome.model.find({userId}).skip(0).limit(10).sort({createdAt: -1})
//     let balance_charges = await BalanceCharge.find({userId}).skip(0).limit(10).sort({createdAt: -1})
//     let agencies = [];
//     let users = [];
//     console.log(`来了`)
//     // //数据结构兼容，之后可以删除
//     let incomeNeedToUpdate = false;
//     for(let i=0;i<balance_incomes.length;i++) {
//         if(!balance_incomes[i].balanceId){
//             await BalanceIncome.model.where({_id: balance_incomes[i]._id }).update({
//                 balanceId: balance._id
//             })
//             incomeNeedToUpdate = true;
//         }

//         if(balance_incomes[i].userId){
//             users.push(await User.model.findOne({_id: balance_incomes[i].userId}))
//         }
//         if(balance_incomes[i].agency) {
//             console.log(balance_incomes[i].agency)
//             console.log(1231)
//             // let agency = await Agency.findOne({_id:  balance_incomes[i].agency});
//             // console.log(333)
//             // agencies.push(agency);
//             // let buyer = null;
//             // if(!agency){
//             //     return
//             // }
//             // console.log(agency)
//             // if(agency.userId){
//             //     buyer= await User.model.findOne({_id: agency.userId});
//             //     users.push(buyer);

//             // }else{
//             //     buyer = await User.model.fondOne({name: 'wanchehui'})
//             // }
//             // let product = null;
//             // if(agency.productId){
//             //     product = await Products.model.findOne({name_zh: "万人车汇黑卡"});
//             // }
//             // BalanceIncomes.model.update(income._id, {
//             //     $set: {
//             //         buyer,
//             //         product
//             //     }
//             // })
//         }
//     }
//     //支出数据结构兼容

//     // let chargeNeedToUpdate = false;
//     // balance_charges.forEach(charge=>{
//     //     console.log(123)
//     //     // if(!charge.balanceId){
//     //     //     BalanceCharges.update(charge._id, {
//     //     //         $set: {
//     //     //             balanceId: balance._id
//     //     //         }
//     //     //     })
//     //     //     chargeNeedToUpdate = true;
//     //     // }
//     // });
//     // if(chargeNeedToUpdate){
//     //     balance_charges = BalanceCharge.find({userId},
//     //         {skip: 0, limit: 5, sort: {createdAt: -1}});
//     // }
//     // //======================支出更新完毕
//     ctx.body = {
//         balance,
//         balance_incomes,
//         balance_charges,
//         agencies,
//         users,
//     }

// })
export default ApiRoute;
