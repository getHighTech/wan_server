import WanModel from "../core/model.js";
import mongoose from 'mongoose';


class Order extends WanModel {
    constructor(props){
        super(props);
        this.collection = "orders";
    }
    
}

Order.setScheme(
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
    "Order", "orders"

)

export default Order;
