import WanModel from "../core/model.js";
import mongoose from 'mongoose';

//此乃构造模型的代码模板
class AgencyRelation extends WanModel {
    constructor(props){
        super(props);
        this.collection = "simples";
    }
    static async getMobileSMS(mobile){

        
    }

    static async validSMS(mobile){
        
    }
}

AgencyRelation.setScheme(
    {
      "appName": String,
      "shopId": String,
      "SshopId": String ,
      "status": Boolean,
      "SuserId": String,

    },
    "Simple", "simples"

)

export default  AgencyRelation;
