import WanModel from "../core/model.js";

class ServerKey extends WanModel {
    constructor(props){
        super(props);
        this.collection = "ServerKey";
    }
}

User.setScheme(
    {
        "uuid": String,
        "privateKey": String
    },
    "ServerKey", "server_keys"

)

export default  User;
