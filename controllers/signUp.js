//import model
const { User } = require("../models/signUp");
//import bcrypt
const bcrypt = require("bcrypt");
const { json } = require("express");
require("dotenv").config();
const jwt=require("jsonwebtoken");

exports.signUp = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        //check if user already exits
        const alreadyUser = await user.findOne({ email });

        console.log(alreadyUser);b

        //if user already exits then throw an error
        if (alreadyUser) {
            return res.status(400).json({
                sucess: false,
                message: "user already exists"
            });
        }

        //now hash the coming password for more security
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } 
        catch (error) {
            return res.status(500).json({
                sucess: false,
                message: "error in hashing the password"
            })
        }
    }
    catch (error) {
        console.log("error in signUp contrroller");
        console.error(error);
        process.exit(1);
    }

    //now store the user data in the database

    const user=await User.create({
      name,password:hashedPassword,email,role
    });
    return res.status(200).json({
        success:true,
        message:"data inserted sucessfully"
    });

}

exports.login=async (req,res)=>{
    //fetch data from the request

    const {email,password}=req.body;
    

    //check if email and password are filled or not 
    if(!email || !password){
        return(res.status(500),json({
            sucess:false,
            message:"please fill all data carefully"
        }))
    }

    //now check if user exits or not
   const user=await User.findOne({email});
   const payload={
    email:user.email,
    id:user._id,
    role:user.role
}
   if(!user){
  return(res.status(401),json({
    sucess:false,
    message:"please sign up before log in"
  }))
   }
   if(await bcrypt.compare(password,user.password)){
    //password match
    //create a token
let token=jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
        expiresIn:"2h"
    }
)
//now make a token
user.token=token;
user.password=undefined;
const options={
    expires:new Date(Date.now()+3*4004),
    httpOnly
}

res.cookie("token",token,options).status(400),json({
    message:true,
    user,
    token,
    message:"signed in sucessfully"
})

   }
   else{
    //password not matched
    return(res.status(401),json({
        sucess:false,
        message:"password not match"
    }))
   }

     


}


