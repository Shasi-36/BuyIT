import mongoose from "mongoose"

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    image:[
        {
           type: String,
           required:true
        }
    ],
    categoryId:[
        {
            type: mongoose.Schema.ObjectId,
            ref:"category"
        }
    ],
    sub_categoryId:[
        {
            type: mongoose.Schema.ObjectId,
            ref:"sub_category"
        }
    ],
    unit:{
        type: String,
    },
    stock:{
        type: Number,
        default:null
    },
    price:{
        type: Number,
        default:null
    },
    discount:{
        type: Number,
        default:null
    },
    description:{
        type:String,
    },
    more_details:{
        
    },
    publish:{
        type:boolean,
        default:false
    }
},
{
    timestamp: true
}
)

const productModel =mongoose.model("product",productSchema)

export default productModel;