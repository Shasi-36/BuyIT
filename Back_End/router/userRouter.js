import {Router} from "express"
import { loginController, logoutController, registerUserController, verifyEmailController } from "../Controllers/userController.js"
import Auth from "../Middleware/Auth.js"

const userRouter= Router()

userRouter.post("/register",registerUserController)
userRouter.post("/verify-emaill",verifyEmailController)
userRouter.post("/login",loginController)
userRouter.get("/logout",Auth,logoutController)

export default userRouter;