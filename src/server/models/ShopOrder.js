import WanModel from "../core/model.js";
import mongoose from 'mongoose';


class ShopOrder extends WanModel {
    constructor(props){
        super(props);
        this.collection = "shop_orders";
    }
    
}

ShopOrder.setScheme(
    {
      "orderCode": String,
      "createdAt" : { type: Date, default: Date.now },
      "updatedAt" : { type: Date, default: Date.now },
      "status": String,
      "appName": String,
      "contact": Object,
      "area": String,
      "products": Array,
      "userId": { type: mongoose.Schema.ObjectId, ref: 'users' },
    },
    "ShopOrder", "shop_orders"

)

export default ShopOrder;
