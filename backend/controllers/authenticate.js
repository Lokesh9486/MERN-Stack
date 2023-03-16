const catchAsyncError=require('../middlewars/catchAsyncError');

exports.isAuthenticatedUser=catchAsyncError(async (req,res,next)=>{
    const {token}=req.cookies;
})