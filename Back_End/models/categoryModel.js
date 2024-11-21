import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String
    },

},
{
    timestamp: true
})

const categoryModel = mongoose.model("category", categorySchema)

export default categoryModel;