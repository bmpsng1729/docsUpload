const mongoose=require("mongoose");
require("dotenv").config();
const connectWithDb=()=>{
mongoose.connect(process.env.DATABASE_URL,{
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
})
.then(console.log("DB connected sucessfully"))
.catch((err)=>{
    console.log("db is facing  error in connection");
    console.log(err);
    process.exit(1);
})

};

module.exports=connectWithDb;