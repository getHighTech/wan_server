import WanModel from "../core/model.js";
import mongoose from 'mongoose';

class BalanceIncome extends WanModel {
    constructor(props){
        super(props);
        this.collection = "balance_incomes";
    }
   
}

BalanceIncome.setScheme(
    {
      "createdAt" : { type: Date, default: Date.now },
      "userId": { type: mongoose.Schema.ObjectId, ref: 'users' },
      "reasonType": String,
      "agency": { type: mongoose.Schema.ObjectId, ref: 'users' },
      "text": String,
      "amount": Number,
      "balanceId": { type: mongoose.Schema.ObjectId, ref: 'balances' },
      "productId": { type: mongoose.Schema.ObjectId, ref: 'products' },
      "productCounts": Number,

      

    },
    "BalanceIncome", "balance_incomes"

)

export default  BalanceIncome;
