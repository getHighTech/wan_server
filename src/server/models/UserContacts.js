import WanModel from "../core/model.js";
//此乃构造模型的代码模板
class UserContacts extends WanModel {
    constructor(props){
        super(props);
        this.collection = "user_contacts";
    }

}

UserContacts.setScheme(
    {
       "_id": String,
      "name": String,
      "mobile": String,
      "address": String,
      "userId": String,
      "createdAt" : { type: Date, default: Date.now },
      "deleted": Boolean

    },
    "UserContacts", "user_contacts"

)

export default  UserContacts;
