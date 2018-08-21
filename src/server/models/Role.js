import WanModel from "../core/model.js";
//此乃构造模型的代码模板
class Role extends WanModel {
    constructor(props){
        super(props);
        this.collection = "roles";
    }
   
}

Role.setScheme(
    {
       "_id": String,
      "name": String,
      "createdAt" : { type: Date, default: Date.now },

    },
    "Role", "roles"

)

export default  Role;
