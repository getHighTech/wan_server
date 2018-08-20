import mongoose from 'mongoose';
import BalanceIncome from '../models/BalanceIncome.js';
import Balance from '../models/Balance.js';
import BalanceCharge from '../models/BalanceCharge.js';
import User from '../models/User.js';


export const loadMoney = async(ctx) => {
    try{
        const { userId } = ctx.query
        let balance = await Balance.model.findOne({userId});
        let balance_incomes = await BalanceIncome.model.find({userId}).skip(0).limit(10).sort({createdAt: -1})
        let balance_charges = await BalanceCharge.find({userId}).skip(0).limit(10).sort({createdAt: -1})
        let agencies = [];
        let users = [];
        // //数据结构兼容，之后可以删除
        let incomeNeedToUpdate = false;
        for(let i=0;i<balance_incomes.length;i++) {
            if(!balance_incomes[i].balanceId){
                await BalanceIncome.model.where({_id: balance_incomes[i]._id }).update({
                    balanceId: balance._id
                })
                incomeNeedToUpdate = true;
            }

            if(balance_incomes[i].userId){
                users.push(await User.model.findOne({_id: balance_incomes[i].userId}))
            }
            if(balance_incomes[i].agency) {
                // let agency = await Agency.findOne({_id:  balance_incomes[i].agency});
                // console.log(333)
                // agencies.push(agency);
                // let buyer = null;
                // if(!agency){
                //     return
                // }
                // console.log(agency)
                // if(agency.userId){
                //     buyer= await User.model.findOne({_id: agency.userId});
                //     users.push(buyer);

                // }else{
                //     buyer = await User.model.fondOne({name: 'wanchehui'})
                // }
                // let product = null;
                // if(agency.productId){
                //     product = await Products.model.findOne({name_zh: "万人车汇黑卡"});
                // }
                // BalanceIncomes.model.update(income._id, {
                //     $set: {
                //         buyer,
                //         product
                //     }
                // })
            }
        }
        //支出数据结构兼容

        // let chargeNeedToUpdate = false;
        // balance_charges.forEach(charge=>{
        //     console.log(123)
        //     // if(!charge.balanceId){
        //     //     BalanceCharges.update(charge._id, {
        //     //         $set: {
        //     //             balanceId: balance._id
        //     //         }
        //     //     })
        //     //     chargeNeedToUpdate = true;
        //     // }
        // });
        // if(chargeNeedToUpdate){
        //     balance_charges = BalanceCharge.find({userId},
        //         {skip: 0, limit: 5, sort: {createdAt: -1}});
        // }
        // //======================支出更新完毕
        ctx.body = {
            balance,
            balance_incomes,
            balance_charges,
            agencies,
            users,
        }
    }
    catch(err) {
        msg: "fail"
    }
}
