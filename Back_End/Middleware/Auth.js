import React from 'react'
import jwt from "jsonwebtoken"


const Auth = async (req,res,next) => {
  try {
    const token=req.cookies.accessToken || req.header?.authorization.split(" ")
    console.log("token",token)

    if(!token){
        return res.status(401).json({
            message:"Token Not Foud/provide token",
            error:true,
            success:false
        })
    }

    const decode = await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN)

    if(!decode){
        return res.status(401).json({
            message:"Unathorised access",
            error:true,
            success:false
        })
    }

    req.userId = decode.id 
    next()
  } catch (error) {
    return res.status(500).json({
        message:error.message || error,
        error:true,
        success:false
    })
  }
}

export default Auth