const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express(); //this sentence is going to initalize a new express app
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res)=>{
 res.sendFile(__dirname + "/index.html")
    
})
app.post("/",(req,res)=>{

   const query=req.body.cityName;
    const apiKey="75874ca12bad2f18fd73dad9827305ef"
    const unit='metric'
    const url="https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&q="+query+"&units="+unit;
    https.get(url,(response)=>{
        // console.log(response); to see the full response
        response.on('data',(data)=>{
            const weatherData=JSON.parse(data);
            // console.log(weatherData);

        const temp=weatherData.main.temp;
        const weatherDescription=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon
        // console.log(temp);
        // console.log(weatherDescription); to check in the console
        res.send(`<h1>The tempreture in ${query} is ${temp} degrees Celcius</h1>
                <h2>The weather is currently ${weatherDescription}</h2>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
        `);
        //or you can do each in res.write and just res.send();
        })
    })
})



app.listen(3000,()=>{
    console.log("server is running in port 3000");
})