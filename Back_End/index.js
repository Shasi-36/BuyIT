import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import morgan from "morgan"
import helmet from "helmet"
import ConnectDB from "./Config/DataBase.js"
import userRouter from "./router/userRouter.js"

const app = express()
dotenv.config()
app.use(express.json())
// app.use(morgan())
app.use(cookieParser())

app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL
}))

app.use(helmet({
    crossOriginResourcePolicy:false
}))

const PORT=8080 || process.env.PORT

app.get("/",(req,res)=>{
    res.status=200
    res.json('hello BuyIt User get all prodcts at one store')
})

app.use("/api/user",userRouter)
ConnectDB().then(()=>{
    app.listen(PORT,(req,res)=>{
        console.log(`port running at ${PORT}`)
    })
}
   
)

