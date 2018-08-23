import mongoose from 'mongoose';
import Shop from '../models/Shop.js';

export const getShop = async(ctx) => {
    try{
      
        const shop = await Shop.model.find({_id: "XxJ923ZRLHww44nED"}).skip(0).limit(10).sort({createdAt: -1})
        ctx.body = {
            shop,
        }
    } 
    catch (err) {
        ctx.body = {
            msg: 'fail'
        }
    }
}

