import mongoose from "mongoose";

const sub_categorySchema = new mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    image:{
        type:String,
        default:""
    },
    categoryId:[
        {
            type: mongoose.Schema.ObjectId,
            ref:"category"
        }
    ],

},
{
    timestamps: true
}
)

const sub_categoryModel = mongoose.model("sub_category",sub_categorySchema)

export default sub_categoryModel;