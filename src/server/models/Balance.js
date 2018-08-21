import WanModel from "../core/model.js";
import mongoose from 'mongoose';

class Balance extends WanModel {
    constructor(props){
        super(props);
        this.collection = "balances";
    }
   
}

Balance.setScheme(
    {
      "_id": String,
      "amount": Number,
      "createdAt" : { type: Date, default: Date.now },
      "updatedAt" : { type: Date, default: Date.now },
      "userId": { type: String, ref: 'User' },
      

    },
    "Balance", "balances"

)

export default  Balance;
