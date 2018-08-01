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
      "userId": String,
      "reasonType": String,
      "agency": String,
      "text": String,
      "amount": Number,
      "balanceId": String,
      "productId": String,
      "productCounts": Number,
      "updatedAt" : String,

      

    },
    "BalanceIncome", "balance_incomes"

)

export default  BalanceIncome;
