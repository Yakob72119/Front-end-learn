//jshint esversion:6
const express =require("express");
const app= express();

app.get("/",(req,res)=>{
    // console.log(request); to see the request that is sent

    res.send("hello");
})

// "/" this define the home route that means when we are asked specfic route

app.get("/contact",(req,res)=>{
res.send("contact me a: yakob51@gmail.com");
})

app.get("/about",(req,res)=>{
    res.send("my name is yakob i love coke and code");
})

app.listen(3000,()=>{
   console.log("server started on port 3000");
});