import userModel from "../models/UserModel.js"
import bcryptjs from "bcryptjs"
import dotenv from "dotenv"
import sendEmail from "../Config/sendEmail.js"
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js"
import generatedAccessToken from "../utils/accessToken.js"
import genertedRefreshToken from "../utils/refreshToken.js"
import uploadImageClodinary from "../utils/uploadImageCloudinary.js"



dotenv.config()
export async function registerUserController(request,response){
    try {
        const { name, email , password } = request.body

        if(!name || !email || !password){
            return response.status(400).json({
                message : "provide email, name, password",
                error : true,
                success : false
            })
        }

        const user = await userModel.findOne({ email })

        if(user){
            return response.json({
                message : "Already register email",
                error : true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)

        const payload = {
            name,
            email,
            password : hashPassword
        }

        const newUser = new userModel(payload)
        const save = await newUser.save()

        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : "Verify email from binkeyit",
            html : verifyEmailTemplate({
                name,
                url : VerifyEmailUrl
            })
        })

        return response.json({
            message : "User register successfully",
            error : false,
            success : true,
            data : save
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function verifyEmailController(request,response){
    try {
        const { code } = request.body

        const user = await userModel.findOne({ _id : code})

        if(!user){
            return response.status(400).json({
                message : "Invalid code",
                error : true,
                success : false
            })
        }

        const updateUser = await userModel.updateOne({ _id : code },{
            verify_email : true
        })

        return response.json({
            message : "Verify email done",
            success : true,
            error : false
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : true
        })
    }
}

////////////////////////////////////////login controller////////////////////////////////////////////////////
export async function loginController(request,response){
    try {
        const { email , password } = request.body


        if(!email || !password){
            return response.status(400).json({
                message : "provide email/password",
                error : true,
                success : false
            })
        }

        const user = await userModel.findOne({ email })

        if(!user){
            return response.status(400).json({
                message : "User not register",
                error : true,
                success : false
            })
        }

        if(user.status !== "Active"){
            return response.status(400).json({
                message : "Contact to Admin",
                error : true,
                success : false
            })
        }

        const checkPassword = await bcryptjs.compare(password,user.password)

        if(!checkPassword){
            return response.status(400).json({
                message : "Check your password",
                error : true,
                success : false
            })
        }

        const accesstoken = await generatedAccessToken(user._id)
        const refreshToken = await genertedRefreshToken(user._id)

       

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        response.cookie('accessToken',accesstoken,cookiesOption)
        response.cookie('refreshToken',refreshToken,cookiesOption)

        return response.json({
            message : "Login successfully",
            error : false,
            success : true,
            data : {
                accesstoken,
                refreshToken
            }
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

/********************* LOGOUT CONTROLLER **************************/

export async function logoutController(req,res) {
    
    try {

        const userid= req.userId
        const cookiesOption={
            httpOnly:true,
            secure:true,
            sameSite:"None"
        }
        res.clearCookie('accessToken',cookiesOption)
        res.clearCookie('refreshToken',cookiesOption)

        const removeRefreshToken = await userModel.findByIdAndUpdate(userid,{
            refresh_token:""
        })
        res.status(200).json({
            message:"Logout Successfly",
            error:false,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

/****************** UPLOAD AVATAR***************/

export async function uploadAvatar(req,res) {
    try {
        const userId=req.userId // from auth middleware
        const image =req.file // from multer middleware
        const upload = await uploadImageClodinary(image)

            const updateUser = await userModel.findByIdAndUpdate(userId,{
                avatar:upload.url
            })
        return res.json({
            message:"upload file successfully",
            data:
                {
                    _id: userId,
                    avatar:upload.url
                }
            
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error:true,
            success:false
        })
    }
}

/****************** UPDATE USER DETAILS***************/

export async function UpdateUserDetails(req,res) {
    try {
        const userId = req.userId // from auth middleware
        const{name,email,mobile,password}= req.body

        let hashPassword=""

        if(password){
            const salt = await bcryptjs.genSalt(10)
            const hashPassword = await bcryptjs.hash(password,salt)
        }
        const updateUserDetails = await userModel.updateOne({_id:userId},{
            ...(name && {name:name}),
            ...(email && {email:email}),
            ...(mobile && {mobile:mobile}),
            ...(password && {password:hashpassword})
        })

        return res.status(201).json({
            message: "User Details Updated Successfully",
            error:false,
            success:true,
            data:updateUserDetails
        })
    } catch (error) {
        return res.status(500).json({
             message:error.message || error,
             error:true,
             success:false
        })
    }
}
