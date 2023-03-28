const catchAsyncError = require("../middlewars/catchAsyncError");
const User = require("../models/userModel");
const sendEmail = require("../utils/email");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwt");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });
  sendToken(user,201,res)
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("please Enter email &password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if(!user){
    return next(new ErrorHandler("Invalid email or password",400));
  }
  if(!await user.isValidPassword(password)){
    return next(new ErrorHandler("Invald email or password",400));
  }
  sendToken(user,201,res)
});

exports.forgotPassword=catchAsyncError(async(req,res,next)=>{
  const user =await User.find({email:req.body.email});
  if(!user){
    return next(new ErrorHandler("User not found with this email",404));
  }
  let resetToken=user.getResetToken();
  await user.save({
    validateBefore:false
  });

  const resetUrl=`${req.protocol}://${req.get('host')}.api/v1/password/reset/${resetToken}`
  const message=`your password reset url is as follows \n
  ${resetUrl}\n\n If you have not requested this email,then ignore it.`
  try{
    sendEmail({
      email:user.email,
      subject:"mern stack  password recovery",
      message
    })
    res.status(200).json({
      status:true,
      message:`Email sent to ${user.email}`
    })
  }
  catch(error){
    user.resetPasswordToken=undefined;
    user.resetPasswordTokenExpire=undefined;
   await user.save({
      validateBefore:false
    })
  return next(new ErrorHandler(error.message,500))
  }
})

exports.getUserProfile=catchAsyncError(async(req,res,next)=>{
  const user=await User.findById(req.user.id)
  res.status(200).json({
    success:true,
    user
  })
})

exports.changePassword=catchAsyncError(async(req,res,next)=>{
  const user=await User.findById(req.body.id);
  if(!user.isValidPassword())
})