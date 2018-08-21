import WanModel from "../core/model.js";
//此乃构造模型的代码模板
class UserRole extends WanModel {
    constructor(props){
        super(props);
        this.collection = "user_roles";
    }
   
}

UserRole.setScheme(
    {
       "_id": String,
      "userId": String,
      "roleId": String,
      "roleName": String,
      "roleId": String,
      "createdAt" : { type: Date, default: Date.now },
      "status": Boolean

    },
    "UserRole", "user_roles"

)

export default  UserRole;
