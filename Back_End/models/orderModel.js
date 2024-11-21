import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({

    userId:{
        type: String,
        reqired:true
    },
    orderId:{
        type:String,
        required: true
    },
    product_details:{
        type:String,
    },
    payment_id:{
        type:String,
        requuired:true
    },
    payment_status:{
        type:String
    },
    delivery_address:{

    },
    delivery_status:{
        type:String,

    },
    subTotalAmt:{
        type:Number,
        default:null
    },
    invoice_reciept:{
        type:String,

    }
},
{
    timestamp: true
})


const orderModel= mongoose.model("order",orderSchema)

export default orderModel;