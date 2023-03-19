const sendToken=(user,statusCode,res)=>{
    const token=user.getJWTToken();
    const option={
        epxires:new Date(
            DaTe.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000
        ),
        HttpOnly:true,

    }
    res.status(statusCode)
    .cookie('token',token,option)
    .json({
        success:true,
        token,
        user
    })
}

module.exports=sendToken;