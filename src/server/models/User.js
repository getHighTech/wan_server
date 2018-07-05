import WanModel from "../core/model.js";

class User extends WanModel {
    constructor(props){
        super(props);
        this.collection = "users";
    }
}

User.setScheme(
    {
        "createdAt" : { type: Date, default: Date.now },
        "services" : {
            "password" : {
                "bcrypt" : String
            },
            "resume" : {
                "loginTokens" : Array,
                "loginLocation" : Array,
            }
        },
        "username" : String,
        "profile" : {
            "mobile" : String,
            "isNewFromMobile" : Boolean
        },
        "score" : Number,
        "logintimes" : Number,
        "lastLoginTime" :  { type: Date, default: Date.now },

        "nickname" : String,
        "dataAutograph" : String,
    },
    "User", "users", {
        //OPTIONAL 提供不同版本的api, 标注哪些字段需要展开
        breif: ['username', 'profile', 'nickname', 'createdAt'],
        detail: ['score', 'username', 'profile', 'nickname', 'createdAt', 'logintimes', 'lastLoginTime', 'nickname'],
        expose: ['profile']
    }
)

export default  User;
