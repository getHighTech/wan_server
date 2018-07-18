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
        "privateKey": String,
        "publicKey": String,
        "password": String,
        "type": String,
        "typeOption": Object
    },
    "ServerKey", "server_keys"

)

export default  User;
