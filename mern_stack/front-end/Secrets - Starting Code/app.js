//jshint esversion:6
const express= require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
const app= express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB")
const userSchema={
    email:String,
    password: String
};

const User=new mongoose.model("User", userSchema)
app.get("/", (req, res)=>{
    res.render("home")
})

app.get("/login", (req, res)=>{
   
    res.render("login")
})

app.get("/register", (req, res)=>{
   
    res.render("register")
})

app.post("/register", (req,res)=>{
    const {username, password} =req.body;
    const newUser= new User({
        email: username,
        password: password
    })
    newUser.save().then(result => {
        res.render("secrets")
      })
      .catch(err => {
        console.log(err)
      });
});

app.post("/login",(req,res)=>{
    const {username, password}=req.body;

    User.findOne({email:username}).then(foundUser=>{
        if(foundUser){
            if(foundUser.password === password){
               res.render("secrets");
            }
        }
    }).catch(err=>{
        console.log(err)
    });
    
});
app.listen(3000, function(){
    console.log("server statrted on port 3000")
})