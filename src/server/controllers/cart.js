import mongoose from 'mongoose';
import Cart from '../models/Cart.js';

export const myCart = async(ctx) => {
    try{
        const { userId, cartId } = ctx.query

        const cart = await Cart.model.find({_id: cartId, userId, orderStatus: "notFinish"});
        console.log(cart);
        if (cart.length<1) {
          let result =await Cart.model.find({userId, orderStatus: "notFinish"});
          ctx.body = {
              cart:result
          }
        }
        else {
          ctx.body = {
              cart
          }
        }


    }
    catch (err) {
        ctx.body = {
            msg: 'failllll'
        }
    }
}
