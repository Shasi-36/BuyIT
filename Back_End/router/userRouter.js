import {Router} from "express"
import { userController } from "../Controllers/userController.js"

const userRouter= Router()

userRouter.post("/register",userController)

export default userRouter;