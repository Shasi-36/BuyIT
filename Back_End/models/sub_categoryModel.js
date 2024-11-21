import mongoose from "mongoose";

const sub_categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    image:{
        type:String
    },
    categoryId:[
        {
            type: mongoose.Schema.ObjectId,
            ref:"category"
        }
    ],

},
{
    timestamp: true
}
)

const sub_categoryModel = mongoose.model("sub_category",sub_categorySchema)

export default sub_categoryModel;