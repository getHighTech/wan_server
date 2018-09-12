import mongoose from 'mongoose';
import Products from '../models/Products.js';
import Shop from '../models/Shop.js';


export const getShopProducts = async(ctx) => {
    try{
        const { shopId, pages, pagesize } = ctx.query
        console.log('-----------------'+pages);
        let newpagesize = Number(pagesize)
        const shop = await Shop.model.findOne({'_id':shopId})
        const products = await Products.model.find({shopId,isSale:true,$nor: [{productClass: "advanced_card"}],isDelete:{$exists: false}}).limit(newpagesize).skip(pagesize*(pages-1)).sort({createdAt: -1})
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
          const products =await Products.model.find({$nor: [{productClass: "advanced_card"}],isSale: true,isDelete:{$exists: false},shopId: shop._id})
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
          const products = await Products.model.find({shopId,isSale: true,isDelete:{$exists: false}})
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
