const mongoose=require("mongoose");
const validator=require("validator");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Please enter name"]
    },
    email:{
        type:String,
        require:[true,"please enter email"],
        unique:true,
        validate:[validator.isEmail,"please enter valid email"],
    },
    password:{
        type:String,
        require:[true,"please enter password"],
        maxlength:[6,"password cannot exceed 6 Characters"]
    },
    avator:{
        type:String,
        require:true
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

const model=mongoose.model("user",userSchema);

module.exports=model;