import WanModel from "../core/model.js";
//此乃构造模型的代码模板
class CollectionAccess extends WanModel {
    constructor(props){
        super(props);
        this.collection = "simples";
    }
   
}

CollectionAccess.setScheme(
    {
       "_id": String,
      "collectionName": String,
      "roleName": String,
      "read": Boolean,
      "write": Boolean,

    },
    "Simple", "simples"

)

export default  CollectionAccess;
