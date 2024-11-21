import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
    productId:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        default:null
    },
    userId:{
        type:String,
        required:true
    }
},{
    timestamp: true
}
)

const cartProductModel = mongoose.model("cartProduct",cartProductSchema)

export default cartProductModel;