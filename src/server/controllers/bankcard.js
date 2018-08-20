import mongoose from 'mongoose';
import bankcard from '../models/BankCard.js';


export const  getBankcards = async(ctx) => {
    try{
        const { bankId } = ctx.query
        const bankcards = await BankCard.model.find({userId:bankId})
        ctx.body = {
        bankcards
        }
    } 
    catch (err) {
        ctx.body = {
          msg: 'fail'
        }
     }
}