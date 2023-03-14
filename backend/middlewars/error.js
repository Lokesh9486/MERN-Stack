const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  // 500 is internal server error
  if(process.env.NODE_ENV=='developement'){
    res.status(err.statusCode).json({
      success:false,
      message:err.message,
      stack: err.stack,
      error:err
    })
  }
  else{
    let message=err.message;
    let error=new Error(err);
    if(err.name=="ValidationError"){
      message=Object.values(err.errors).map(value=>value.message)
      error=new ErrorHandler(message,400);
    }
    if(err.name="CastError"){
       message=`Resource not found : ${err.path}`; 
       error=new ErrorHandler(message,400);
    }
    res.status(err.statusCode).json({
      success:false,
      message:error.message || "Internal Server Error",
    })

  }
};
