import mongoose from 'mongoose';
import Order from '../models/Order.js';
import ShopOrder from '../models/ShopOrder.js';

export const getOrderStatus = async(ctx) => {
    // try{
        const { userId, status,appName,page } = ctx.query
        console.log(page)
        let pagesize = 10;
        // let number = Number(page)*10
        const order = await Order.model.find({userId,status,appName}).skip(pagesize*(page-1)).limit(10).sort({createdAt: -1})
        // const order = await Order.model.find({userId,status,appName}).limit(number).sort({createdAt: -1})
        ctx.body = {
            order,
        }
    // }
    // catch (err) {
    //     ctx.body = {
    //         msg: 'fail'
    //     }
    // }
}

export const getOrderStatusConfirmed = async(ctx) => {
    // try{
        const { userId,orderId,appName,page } = ctx.query

        const orders = await Order.model.update({_id:orderId},{$set:{status:'cancel'}});
        const shoporder=await ShopOrder.model.update({orderId:orderId},{$set:{status:'cancel'}});

        if(!orders || orders.lenght === 0){
          ctx.body = {
            msg: 'fail'
          }
      }else{
          let pagesize = 10;
          const order =await Order.model.find({userId,status: "confirmed",appName:appName}).skip(pagesize*(page-1)).limit(10).sort({createdAt: -1})
          ctx.body = {
              order
          }
      }

}






export const getOrderStatusPaid = async(ctx) => {
    // try{
        const { userId,orderId,appName,page } = ctx.query
        const orders = await Order.model.update({_id:orderId},{$set:{status:'recevied'}});
        const shoporder=await ShopOrder.model.update({orderId:orderId},{$set:{status:'recevied'}});

        if(!orders || orders.lenght === 0){
          ctx.body = {
            msg: 'fail'
          }
      }else{
          let pagesize = 10;
          const order =await Order.model.find({userId,status: "paid",appName:appName}).skip(pagesize*(page-1)).limit(10).sort({createdAt: -1})
          ctx.body = {
              order
          }
      }

}
