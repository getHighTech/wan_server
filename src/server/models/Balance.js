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
      "userId": { type: mongoose.Schema.ObjectId, ref: 'users' },
      

    },
    "Balance", "balances"

)

export default  Balance;
