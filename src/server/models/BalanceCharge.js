import mongoose from 'mongoose';
const Schema = mongoose.Schema

const BalanceChargeSchema = new Schema(
    {
        _id: String
    }
)

export default mongoose.model(' BalanceCharge', BalanceChargeSchema,'balance_charges');
