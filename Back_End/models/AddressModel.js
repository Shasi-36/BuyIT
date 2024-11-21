import mongoose from "mongoose"

const addressSchema = new mongoose.Schema({
    address_line:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    pincode:{
        type:String
    },
    country:{
        type:String
    },
    mobile:{
        type:Number,
        default:null
    }
},{
    timestamp: true
})

const addressModel= mongoose.model("address", addressSchema)

export default addressModel