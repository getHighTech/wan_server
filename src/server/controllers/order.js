import mongoose from 'mongoose';
import Order from '../models/Order.js';

export const getOrderStatus = async(ctx) => {
    try{
        const { userId, status,appName } = ctx.query
        const order = await Order.model.find({userId,status,appName}).skip(0).limit(10).sort({createdAt: -1})
        ctx.body = {
            order,
        }
    } 
    catch (err) {
        ctx.body = {
            msg: 'fail'
        }
    }
}

