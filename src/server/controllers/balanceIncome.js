import mongoose from 'mongoose';
import BalanceIncome from '../models/BalanceIncome.js';
import moment from "moment"

export const getPeriodIncome = async(ctx) => {
    try{
        const { userId, unit, rangeLength  } = ctx.query
        let yestoday = moment().subtract(rangeLength, unit);
        yestoday = yestoday.toISOString();
        let yestodayInData = new Date(yestoday);
        let incomes = await  BalanceIncome.model.find({createdAt: {'$gte':yestodayInData,'$lt':new Date()}, userId});
        let totalAmount = 0;
        for(let i =0; i<incomes.length; i++)
        {
            totalAmount+=income.amount
        }
        ctx.body = {
                incomes,
                totalAmount,
                unit
        }
    } 
    catch(err) {
        msg: "fail"
    }
}