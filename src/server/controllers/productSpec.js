import mongoose from 'mongoose';
import Products from '../models/Products.js';


export const getProductSpec = async(ctx) => {
  try{
      const {productId} =ctx.query;
      console.log(productId);
      const allproducts=[];
      const product = await Products.model.findOne({'_id':productId});
      if (product) {
        let products = await Products.model.find({shopId:product.shopId,name:product.name,isSale:true})
        for (var i = 0;i<products.length;i++){
          let obj = new Object();
          obj.productId = products[i]._id;
          let aa =products[i].newSpecGroups;
          obj.spec = products[i].newSpecGroups[0].spec_value;
          obj.product=products[i]
          if(i==0){
            obj.status=true;
          }
          else {
            obj.status=false;
          }
          obj.price=products[i].price;
          obj.endPrice=products[i].endPrice;
          allproducts.push(obj)
        }
        ctx.body = {
          allproducts

        }
      }
    }catch(err){
      ctx.body={
        msg:'wrong'
      }
    }
}
