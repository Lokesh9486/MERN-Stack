const catchAsyncError=require("../middlewars/catchAsyncError");
const User =require("../models/userModel");

exports.registerUser=catchAsyncError(async (req,res,next)=>{
    const {name,email,password,avator}=req.body;
    const user=await User.create({
        name,email,password,avator
    });
    const token=user.getJwtToken();
    res.status(201).json({
        success:true,
        user,
        token
    })
})

exports.loginuser=catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please Enter email & password"))
    }
   const user=await User.findOne({email}).select('+password');
   if(!user){
    return next(new ErrorHandler("invalid email or password"));
   }
   
})