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
      "amount": Number,
      "createdAt" : { type: Date, default: Date.now },
      "updatedAt" : { type: Date, default: Date.now },
      "userId": String,
      

    },
    "Balance", "balances"

)

export default  Balance;
