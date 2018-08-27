import mongoose from 'mongoose';
import Products from '../models/Products.js';
import Shop from '../models/Shop.js';


export const getShopProducts = async(ctx) => {
    try{
        const { shopId, page, pagesize } = ctx.query
        let newpage = page-1;
        const products = await Products.model.find({shopId}).limit(4).skip(newpage).sort({createdAt: -1})
        const shop = await Shop.model.findOne({'_id':shopId})
        ctx.body = {
            products,
            shop
        }
    }
    catch (err) {
        ctx.body = {
            msg: 'fail'
        }
    }
}


export const porudctsWarehouse = async(ctx) => {
    try{
        const { appName } = ctx.query
        if (appName) {
          const shop = await Shop.model.findOne({appName})
          const products =await Products.model.find({$nor: [{productClass: "advanced_card"}],isSale: true, shopId: shop._id})
          ctx.body = {
            products
          }
        }
        else {
          const products = []
          ctx.body = {
            products
          }
        }
    }
    catch (err) {
        ctx.body = {
          msg: 'fail'
        }
    }
}


export const sellingProduct = async(ctx) => {
    try{
        const { shopId } = ctx.query
        if (!shopId) {
          const products =[]
          ctx.body = {
            products
          }
        }
        else {
          const products = await Products.model.find({shopId})
          ctx.body = {
            products
          }
        }
     }
     catch (err) {
        ctx.body = {
          msg: 'fail'
        }
    }
}


export const getProductCard = async(ctx) => {
    try{
        const { rolename,shopId } = ctx.query
        let product = await Products.model.findOne({'_id': rolename});
        if(!product){
           product = await Products.model.findOne({'productClass': "common_card",'isSale': true, shopId})
        }
        ctx.body = {
          product
        }
     }
     catch (err) {
        ctx.body = {
          msg: 'fail'
        }
    }
}
