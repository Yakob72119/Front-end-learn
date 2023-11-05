const express= require('express');
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",(req,res)=>{
 console.log(req.body.name);
 console.log(req.body.email);
 console.log(req.body.password);

})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})