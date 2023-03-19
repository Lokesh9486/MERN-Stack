const express=require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { logoutUser } = require("../middlewars/authenticate");
const router=express.Router();


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

module.exports=router;