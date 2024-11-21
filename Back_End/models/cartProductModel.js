import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:"product"
    },
    quantity:{
        type:Number,
        default:null
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
},
    timestamps: true
}
)

const cartProductModel = mongoose.model("cartProduct",cartProductSchema)

export default cartProductModel;