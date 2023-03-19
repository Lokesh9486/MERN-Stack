const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter name"]
    },
    email:{
        type:String,
        required:[true,"please enter email"],
        index:{
            unique:true,
            
        },
        validate:[validator.isEmail,"please enter valid email"],
    },
    password:{
        type:String,
        required:[true,"please enter password"],
        maxlength:[6,"password cannot exceed 6 Characters"],
        select:false
    },
    avator:{
        type:String,
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordTokenExpire:Date,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

userSchema.pre("save",async function(){
    this.password=await  bcrypt.hash(this.password,10);
})

userSchema.methods.getJwtToken=function(){
  return jwt.sign({id:this.id},process.env.JWT_SECRET,{
      expiresIn:process.env.JWT_EXPIRES_TIME 
    })
}

const model=mongoose.model("user",userSchema);

module.exports=model;