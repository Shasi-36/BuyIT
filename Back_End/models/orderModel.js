import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    orderId:{
        type:String,
        required: [true,"Provide OrderId"],
        unique:true
    },
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:"product"
    },
    product_details:{
        _id:String,
        name:String,
        image:Array
    },
    payment_id:{
        type:String,
        default:""
    },
    payment_status:{
        type:String,
        default:""
    },
    delivery_address:{
        type: mongoose.Schema.ObjectId,
        ref:"address"
    },
    delivery_status:{
        type:String,
        default:""

    },
    subTotalAmt:{
        type:Number,
        default:null
    },
    totalAmt:{
        type:Number,
        default:0
    },
    invoice_reciept:{
        type:String,
        default:""

    },
},
{
    timestamps: true
})


const orderModel= mongoose.model("order",orderSchema)

export default orderModel;