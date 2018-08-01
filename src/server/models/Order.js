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
      "user": { type: mongoose.Schema.ObjectId, ref: 'User' },
      "updatedAt" : Date,
      "status": String,
      "appName": String,
      "contact": Object,
      "area": String,
      "products": Array,
      "userId": String,
    },
    "Order", "orders"

)

export default Order;
