import WanModel from "../core/model.js";
//此乃构造模型的代码模板
class Shop extends WanModel {
    constructor(props){
        super(props);
        this.collection = "shops";
    }
   
}

Shop.setScheme(
    {
        "createdAt" : { type: Date, default: Date.now },
        "name": String,
        "name_zh": String,
        "tag": Array,
        "cover": String,
        "acl": Object,
        "description": String,
        "status": Boolean,
        "phone": String,
        "lanAndLat": Array

    },
    "Shop", "shops"

)

export default  Shop;
