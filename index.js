const express=require("express");
const app=express();
//find the port number
require("dotenv").config();
const PORT=process.env.PORT ||4000;
app.use(express.json());

//listen the app on finded port number
app.listen(PORT,(req,res)=>{
console.log(`db is sucessfully listen on ${PORT} port number`);
} );

//connect to the database
const connect=require("./config/database");
connect();
const router=require("./routers/route")

app.use("/api/v1",router);

app.get("/",(req,res)=>{
    console.log(`<h1>this is homepage</h1>`);
    res.send(`<h1>this is homepage</h1>`);
});

