import mongoose from 'mongoose';
import BalanceCharge from '../models/BalanceCharge.js';

export const getWithdraw = async(ctx) => {
    try{
        let page = parseInt(ctx.query.page? ctx.query.page : 1);
        let pagesize  = parseInt(ctx.query.pagesize? ctx.query.pagesize : 10);
        const { userId  } = ctx.query
        let balance_charges = await  BalanceCharge.find({userId})
                                                  .skip(pagesize*(page-1))
                                                  .limit(pagesize)
                                                  .sort({createdAt: -1})
        ctx.body = {
            balance_charges
        }
    } 
    catch(err) {
        ctx.body = {
            msg: "fail"
        }
    }
}