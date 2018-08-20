import WanModel from "../core/model.js";
//此乃构造模型的代码模板
class ProductOwner extends WanModel {
    constructor(props){
        super(props);
        this.collection = "product_owners";
    }
   
}

ProductOwner.setScheme(
    {
       "_id": String,
      "userId": String,
      "productId": String,
      "createdAt" : { type: Date, default: Date.now },

    },
    "ProductOwner", "product_owners"

)

export default  ProductOwner;
