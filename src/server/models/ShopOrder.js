import WanModel from "../core/model.js";


class ShopOrder extends WanModel {
    constructor(props){
        super(props);
        this.collection = "shop_orders";
    }
    
}

ShopOrder.setScheme(
    {
      "createdAt" : { type: Date, default: Date.now },
      "updatedAt" : { type: Date, default: Date.now },
      "status": String,
      "appName": String,
      "contact": Object,
      "area": String,
      "orderId": String,
      "products": Array,
      "userId": String,
    },
    "ShopOrder", "shop_orders"

)

export default ShopOrder;
