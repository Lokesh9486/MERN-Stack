const catchAsyncError=require('./catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const User=require("../models/userModel");
const { Error } = require('mongoose');

exports.isAuthenticatedUser=catchAsyncError(async (req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHandler('login first to handle this resource',400))
    }  
    const decoded=jwt.verfiy(token,process.env.JWT_SECRET)
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