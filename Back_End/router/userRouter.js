import {Router} from "express"
import { loginController, logoutController, 
    registerUserController, 
    UpdateUserDetails, uploadAvatar, 
    verifyEmailController } from "../Controllers/userController.js"
import Auth from "../Middleware/Auth.js"
import upload from "../Middleware/multer.js"

const userRouter= Router()

userRouter.post("/register",registerUserController)
userRouter.post("/verify-emaill",verifyEmailController)
userRouter.post("/login",loginController)
userRouter.get("/logout",Auth,logoutController)
userRouter.put("/upload-avatar",Auth,upload.single('avatar'),uploadAvatar)
userRouter.put("/update-user",Auth,UpdateUserDetails)

export default userRouter;