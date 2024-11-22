import userModel from "../models/UserModel.js"
import bcryptjs from "bcryptjs"
import dotenv from "dotenv"
import sendEmail from "../Config/sendEmail.js"
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js"


export async function userController(req,res) {

    try {

        const {name,email,password}= req.body

        if(!name || !email || !password){
            return res.status(400).json({
                message:"Please provide Required Fields",
                error: true,
                success:false
            })
        }
         
        
        const userEmail = await userModel.findOne({email})

        if(userEmail){
            return res.json({
                message: "Email already exist",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt) 

        const payload ={
            name,
            email,
            password : hashPassword
        }

        const newUser = await userModel(payload)
        const userSave = await newUser.save()

        const verifyEmailUrl=`${process.env.FRONTEND_URL}/verify-email?code=${userSave._id}`

        const verifyEmail= await sendEmail({
            sendto:email,
            subject:"Verify Email from BuyIT",
            html: verifyEmailTemplate({
                name,
                url:verifyEmailUrl
            })
        })

        return res.json({
            message:"User registered Successfully",
            error:false,
            success:true,
            data:userSave
        })
    } catch (error) {
        return res.status(500).json({
            message: message.error || error,
            error:true,
            success:false
        })
    }
    
}