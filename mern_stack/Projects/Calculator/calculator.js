const express=require("express");
const bodyParser=require("body-parser");
 
const app=express();
app.use(bodyParser.urlencoded({extended:true})); // this what we use when we want to pass a data that come frome html form 
// when ever you want to get a info that is posted to your server from html page

app.get("/",(req,res)=>{
    // res.send("Hello World");
    //res.sendFile("index.html")//we can use relative file but in the future when we deploy it cloud we wouldnt know where it will be so use constant
    res.sendFile(__dirname + "/index.html");
    //we can console.log the __dirname to see the file path
})

app.post("/",(req,res)=>{
    //here we can see the data that we can get by urlencoded
    // console.log(req.body);
    // console.log(req.body.num1);
    var num1=Number(req.body.num1);
    var num2=Number(req.body.num2);
    var result=num1 + num2;

    res.send("The result of the calculation is " + result);
})

//once we installed body-parser we can use it by require it

app.listen(3000,()=>{
    console.log("server is start running in port 3000");
})