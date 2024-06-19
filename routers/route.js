const {signUp}=require("../controllers/signUp");

const express=require("express");
router=express.Router();
router.post("/signup",signUp);

module.exports=router;