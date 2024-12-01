const express= require('express');
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",(req,res)=>{

    const fullName=req.body.fname.split(/\s+/);
    const fname=fullName[0];
    const lname=fullName[1];
    const emailAdeess=req.body.email;
    

 var data ={
    members: [
        {
            email_address : emailAdeess,
            status : "subscribed",
            merge_fields : {
                FNAME:fname,
                LNAME:lname
            }
        }
    ],
    // update_existing: true
 };

 var jsonData = JSON.stringify(data);

 const url= "https://us21.api.mailchimp.com/3.0/lists/7310c909f7"

  const option={
    method:"POST",
    auth:"yakob:c69e9bc8bb8517bf8b626c54c4305199-us21"
  }

 const request=https.request(url,option,(response)=>{

    if(response.statusCode===200){
        res.sendFile(__dirname + "/success.html");
    }else{
        res.sendFile(__dirname + "/failure.html");
    }
    // response.on("data",(dataCalleback)=>{

    // const sentM = JSON.parse(dataCalleback); // Now parse the complete data to get the sended data
    // // console.log(sentM);
       
    // })
 })
 request.write(jsonData);
 request.end();
})

app.post("/failure",(req,res)=>{
    res.redirect("/")
})


app.listen(3000,()=>{
    console.log("server is running on port 3000");
})

// c69e9bc8bb8517bf8b626c54c4305199-us21
// 7310c909f7