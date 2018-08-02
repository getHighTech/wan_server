import WanModel from "../core/model.js";


class ShopOrder extends WanModel {
    constructor(props){
        super(props);
        this.collection = "shop_orders";
    }
    
}

ShopOrder.setScheme(
    {
      "_id": String,
      "createdAt" : { type: Date, default: Date.now },
      "updatedAt" : { type: Date, default: Date.now },
      "status": String,
      "appName": String,
      "contact": Object,
      "area": String,
      "orderId": String,
      "products": Array,
      "userId": String,
      "productCounts": Object
    },
    "ShopOrder", "shop_orders"

)

export default ShopOrder;
