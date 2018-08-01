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
      "shopId": { type: mongoose.Schema.ObjectId, ref: 'shops' },
      "SshopId": { type: mongoose.Schema.ObjectId, ref: 'shops' },
      "status": Boolean,
      "SuserId": { type: mongoose.Schema.ObjectId, ref: 'users' },

    },
    "Simple", "simples"

)

export default  AgencyRelation;
