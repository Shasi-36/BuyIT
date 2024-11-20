import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

if(!process.env.MONGODB_URI){
   throw new Error(
       "Please add MONGODB_URI"
   )
}

async function ConnectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('====================================');
        console.log("Connecte to DB");
        console.log('====================================');
    } catch (error) {
        console.error("Database connection failed",error);
        process.exit(1)
    }
}

export default ConnectDB