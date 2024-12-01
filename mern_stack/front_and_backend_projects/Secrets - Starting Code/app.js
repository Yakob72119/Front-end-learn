//jshint esversion:6
require('dotenv').config();
const express= require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
// for passport
const session = require('express-session');
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose"); 
// const encrypt =require("mongoose-encryption"); lelvel 2
// const md5=require("md5"); level 3

// const bcrypt= require("bcrypt"); level 5
//const saltRounds =10;
const app= express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

 /// setup our session

app.use(session({
    secret:"our little secrete.",
    resave: false,
    saveUninitialized:false
}))

//  initalizing passport

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://localhost:27017/userDB")
const userSchema= new mongoose.Schema({
    email:String,
    password: String
});

userSchema.plugin(passportLocalMongoose); // to hash and salt our password

///here it was the secrete
//userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"]});

const User=new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", (req, res)=>{
    res.render("home")
})

app.get("/login", (req, res)=>{
   
    res.render("login")
})

app.get("/register", (req, res)=>{
   
    res.render("register")
})

app.get("/secrets", (req,res)=>{
    if(req.isAuthenticated()){
        res.render("secrets");
    }else{
        res.redirect("/login")
    }
});
app.get("/logout", (req,res)=>{
    req.logout();
    res.redirect("/");
})
app.post("/register", (req,res)=>{  
   
    // this register method comes from passport local mongoose  and it readuse new user= things
    User.register({username:req.body.username}, req.body.password, function(err,user){
        if(err){
            console.log(err);
            res.redirect("/secrets");
        }else{
            passport.authenticate("local")(req,res, function(){
                res.redirect("/secrets");
            });
        }
    });

});



app.post("/login",(req,res)=>{
     const user =new User({
      username:req.body.username,
      password:req.body.password  
     })   
    
     req.login(user, function(err){
        if(err){
            console.log(err);
        }else{
            passport.authenticate("local")(req,res, function(){
                res.redirect("/secrets");
            });
        }
     })

});


app.listen(3000, function(){
    console.log("server statrted on port 3000")
})



// app.post("/register", (req,res)=>{  
    //               for bcrypt
    // const {username, password} =req.body;
    // bcrypt.hash(password, saltRounds, function(err, hash) {
    //     const newUser= new User({
    //         email: username,
    //         password:hash
    //     })
    //     newUser.save().then(result => {
    //         res.render("secrets")
    //       })
    //       .catch(err => {
    //         console.log(err)
    //       });
    // });

    //                     for md5 this is how it should be performed
    // const newUser= new User({
    //     email: username,
    //     // just use md5 hash fection which is ireversable
    //     password: md5(password)
    // })
    // newUser.save().then(result => {
    //     res.render("secrets")
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   });
// });



// app.post("/login",(req,res)=>{
    //     const username=req.body.username;
    //    // const password=md5(req.body.password;
    //    const password=req.body.password;

    //     User.findOne({email:username}).then(foundUser=>{
    //         if(foundUser){

    //                     // for md5
    //             // if(foundUser.password === password){
    //             //    res.render("secrets");
    //             // }

    //             bcrypt.compare(password, foundUser.password, function(err, result) {
    //                 if(result === true){
    //                     res.render("secrets");
    //                 }

    //             });
    //         }
    //     }).catch(err=>{
    //         console.log(err)
    //     });

// });