const catchAsyncError = require("../middlewars/catchAsyncError");
const User = require("../models/userModel");
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
  console.log(` password:`, password)
  console.log(` email:`, email)
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
