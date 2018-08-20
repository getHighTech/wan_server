import mongoose from 'mongoose';
import Order from '../models/Order.js';

export const GetOrderStatus = async (ctx, next) => {
    try{
        const {userId, status } = ctx.query
        const order = await Order.model.find({userId,status}).skip(0).limit(10).sort({createdAt: -1})
        ctx.body = {
            order,
        }
    } catch (err) {
        ctx.body = {
            msg: 'fail'
        }
    }
}

