const express=require("express");
const bodyParser=require("body-parser");

const app=express();

// initalizing body parser

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname +"/bmiCalculator.html");
})
app.post("/",(req,res)=>{
 const weight=parseFloat(req.body.weight);
 const height=parseFloat(req.body.height);
 const bmi=weight/(height*height);

res.send("Your BMI is:" + bmi);
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})