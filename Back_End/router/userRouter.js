import {Router} from "express"
import { forgotPasswordController, loginController, logoutController, 
    refreshTokenController, 
    registerUserController, 
    resetPassword, 
    UpdateUserDetails, uploadAvatar, 
    verifyEmailController, 
    verifyForgotPasswordOtp} from "../Controllers/userController.js"
import Auth from "../Middleware/Auth.js"
import upload from "../Middleware/multer.js"

const userRouter= Router()

userRouter.post("/register",registerUserController)
userRouter.post("/verify-emaill",verifyEmailController)
userRouter.post("/login",loginController)
userRouter.get("/logout",Auth,logoutController)
userRouter.put("/upload-avatar",Auth,upload.single('avatar'),uploadAvatar)
userRouter.put("/update-user",Auth,UpdateUserDetails)
userRouter.put("/forgot-password",forgotPasswordController)
userRouter.put("/verify-forgot-password",verifyForgotPasswordOtp)
userRouter.put("/reset-password", resetPassword)
userRouter.post("/refresh-token",refreshTokenController)

export default userRouter;