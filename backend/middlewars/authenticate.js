const catchAsyncError=require('./catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const User=require("../models/userModel");
const jwt=require("jsonwebtoken");
const sendToken = require('../utils/jwt');
const crypto=require("crypto");

exports.isAuthenticatedUser=catchAsyncError(async (req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHandler('login first to handle this resource',400))
    }  
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.user=await User.findById(decoded.id)
    next();
})

exports.authorizeRoles=(...roles)=>{
 return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
        return next(new ErrorHandler(`Role ${req.user.role}is not allowed`,400))
    }
   return next();
  }
 }

 exports.logoutUser=(req,res,next)=>{
     res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
     }).status(200).json({status:true,message:"Loggedout"})
 }

 exports.resetPassword=catchAsyncError(
    async(req,res,next)=>{
       const resetPasswordToken=crypto.createHash('sh256').update(req.params.token).digest('hex');
      const user= await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire:{
            $gt:Date.now()
        }
       })
       if(!user){
        return next(new ErrorHandler('Password reset token is invalid or expired'))
       }
       if(req.body.password !==req.body.confrimPassword){
        return  next(new ErrorHandler('Password does  not match'))
       }
       user.password=req.body.password;
       user.resetPasswordToken=undefined;
       user.resetPasswordTokenExpire=undefined;
       await user.save({
        validateBeforeSave:false
       });
        sendToken(user,201,res)
    }
    
 ) 