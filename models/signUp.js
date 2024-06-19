const mongoose=require("mongoose");

const signUpSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,

    },
    //niche wale me kis kis type ke user use kar sakte hai uska info hai
    role:{
        type:String,
        enum:["Admin","user"]

    }
});

module.exports=mongoose.model("user",signUpSchema);