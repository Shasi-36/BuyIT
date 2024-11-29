import userModel from "../models/UserModel.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import sendEmail from "../Config/sendEmail.js"
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js"
import generatedAccessToken from "../utils/accessToken.js"
import genertedRefreshToken from "../utils/refreshToken.js"
import uploadImageClodinary from "../utils/uploadImageCloudinary.js"
import generateOtp from "../utils/generateOtp.js"
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js"
import generateAccessToken from "../utils/accessToken.js"



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

/****************** FORGOT PASSWORD ***************/

export async function forgotPasswordController(req,res) {
    try {
        
        const {email} = req.body
        const user = await userModel.findOne(email)

        if(!user){
            return res.json({
                message:"Email not available",
                error:true,
                success:false

            })
        }

        const otp = generateOtp()
        const expireTime = new Date + 60*60*1000 //1hr
        const update = await userModel.findByIdAndUpdate(user._id,{
            forgot_password_otp:otp,
            forgot_password_expiry: new Date(expireTime).toISOString()
        })

        await sendEmail({
            sendto:email,
            subject:"forgot password from the BuYIT",
            html:forgotPasswordTemplate({
                name:user.name,
                otp:otp
            })
        })

        return res.status(200).json({
            message:"Otp Send Your email",
            error:false,
            success:true,
            data:{
                otp:otp
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

/****************** FORGOT PASSWORD OTP VERIFICATION ***************/
 
export async function verifyForgotPasswordOtp(req,res) {
    try {
        const {email,otp} = req.body

        if(!email || !otp){
            return res.status(400).json({
                message:"Provide required field email, otp",
                error:true,
                success:false
            })
        }
        const user = await userModel.findOne({email})
    
        const currentTime= new Date().toISOString()
    
        if(user.forgot_password_expiry < currentTime){
            return res.status(400).json({
                message:"otp expired",
                error:true,
                success:false
            })
        }
    
        if (otp !== user.forgot_password_otp){
            return res.status(400).json({
                message:"Wrong Otp",
                error:true,
                success:false
            })
        }
        if(!user){
            return res.json({
                message:"email not registered",
                error:true,
                success:false
            })
        }
        // if otp is not expired
        // otp is equal
         
        return res.json({
            message:"otp verified successflly",
            error:true,
            success:false
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
    
   
}

/****************** RESET PASSWORD  ***************/

export async function resetPassword(req,res) {
    try {
        const {email, newPassword, confirmPassword} = req.body

        if(!email || !newPassword || !confirmPassword){
            return res.json({
                message:"please provide required fields",
                error:true,
                success:false
            })
        }

        if(newPassword !== confirmPassword){
            return res.json({
                message:"Password not match",
                error:true,
                success:false
            })
        }

        const user = await userModel.findOne({email})

        if(!user){
            return res.json({
                message:"Email not registered",
                error:true,
                success:false
            })
        }

        const salt= await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(newPassword,salt)

        const updatePassword = await userModel.findByIdAndUpdate(user._id,{
            password:hashPassword
        })
        return res.json({
            message:"Password Upadete Successfully",
            error:false,
            success:true
        })
       
    }

  
    catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

/****************** REFRESH TOKEN ***************/

export async function refreshTokenController(req,res) {
    try {
        const refreshToken = req.cookies.refreshToken || req?.header?.authorization?.split(" ")[1]
         console.log("refresh",refreshToken)
        if (!refreshToken){
            res.status(401).json({
                message:"Invalid Token",
                error:true,
                success:false
            })
        }

        const verifyToken= await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)

        if (!verifyToken){
            res.status(401).json({
                message:"Token Expired",
                error:true,
                success:false
            })
        }

        console.log("verification",verifyToken._id)
        const userId= verifyToken._id
        console.log("userid:",userId)
        const newAccessToken= generateAccessToken(userId)

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

        res.cookie('accessToken',newAccessToken,cookiesOption)

        return res.status(201).json({
            message:"new AccessToken generated",
            error:false,
            success:true,
            data:{
                accessToken:newAccessToken
            }
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
    
}