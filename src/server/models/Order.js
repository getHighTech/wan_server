import mongoose from 'mongoose';
const Schema = mongoose.Schema

const OrderSchema = new Schema(
  {
    type: String,
  },
  { timestamps: true }
)

export default mongoose.model('Order', OrderSchema);