import WanModel from "../core/model.js";
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

class BalanceIncome extends WanModel {
    constructor(props){
        super(props);
        this.collection = "balance_incomes";
        
    }

    
   
}

BalanceIncome.setScheme(
    {
      "createdAt" : { type: Date, default: Date.now },
      "userId": { type: String, ref: 'User' },
      "reasonType": String,
      "agency": { type: String, ref: 'User' },
      "text": String,
      "amount": Number,
      "balanceId": { type: String, ref: 'Balance' },
      "productId": { type: String, ref: 'Products' },
      "productCounts": Number,
      "updatedAt" : String,

      

    },
    "BalanceIncome", "balance_incomes"

)

export default  BalanceIncome;
