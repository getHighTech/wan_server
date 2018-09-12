import WanModel from "../core/model.js";
import mongoose from 'mongoose';


class Cart extends WanModel {
    constructor(props){
        super(props);
        this.collection = "app_carts";
    }

}

Cart.setScheme(
    {
      "_id": String,
      "needToCal": String,
      "createdAt" : Date,
      "status": String,
      "products": Array,
      "shopIDs": Array,
      "productIds":Array,
      "shopNames":Array,
      "userId": String,
      "orderStatus": String,
      "allChecked": Boolean,
      "isCurrent": Boolean,
      "userId": String,
      "newComing": String,
      "count": Number,
      "totalAmount": Number,
      "shopProducts":Object,
      "productCounts":Object,
      "productChecks":Object,
      "shopChecks":Object,
    },
    "Cart", "app_carts"

)

export default Cart;
