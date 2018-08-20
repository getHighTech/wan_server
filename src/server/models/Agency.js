import mongoose from 'mongoose';
const Schema = mongoose.Schema

const AgencySchema = new Schema(
    {
        _id: String
    }
)

export default mongoose.model(' Agency', AgencySchema,'agencies');
