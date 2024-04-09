const bodyParser = require("body-parser");
const express= require("express");
const ejs= require("ejs");
const mongoose=require("mongoose");

const app=express();
app.set('view engine','ejs');// us templeting engine

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wiki");

const articleSchema ={
    title: String,
    content: String
}

const Article=mongoose.model("Article", articleSchema);



//////////////////////// Request targeting all articles ///////////////////////



app.route("/articles")
.get(async function(req, res){
    try {
        const foundArticles = await Article.find();
        res.send(foundArticles); // Sending foundArticles as response
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
})
.post(async function(req, res){
    try {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });

        await newArticle.save();
        res.status(201).send('Article saved successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving article');
    }
})
.delete(async function(req, res){
    try {
      await Article.deleteMany({});
      res.status(200).send("Successfully deleted all articles");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting articles");
    }
  });



//////////////////////// Request targeting specfic articles ///////////////////////



app.route("/articles/:articleTitle")
    .get(async function(req, res){
        try {
            const foundArticle = await Article.findOne({title: req.params.articleTitle});
            if (foundArticle) {
                res.send(foundArticle);
            } else {
                res.send("No article matching that title was found.");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Error finding article");
        }
    })
    .put(async function(req, res){
        try {
            const result = await Article.findOneAndUpdate(
                {title: req.params.articleTitle},
                {title: req.body.title, content: req.body.content},
                {overwrite: true}
            );
            if (result) {
                res.send("Successfully updated article.");
            } else {
                res.send("No article matching that title was found.");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Error updating article.");
        }
    })
    .patch(async function(req, res){
        try {
            const result = await Article.findOneAndUpdate(
                {title: req.params.articleTitle},
                {$set: req.body},
                {new: true}
            );
            if (result) {
                res.send("Successfully updated article.");
            } else {
                res.send("No article matching that title was found.");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Error updating article.");
        }
    })
    .delete(async function(req, res){
        try {
            const result = await Article.findOneAndDelete({title: req.params.articleTitle});
            if (result) {
                res.send("Successfully deleted article.");
            } else {
                res.send("No article matching that title was found.");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Error deleting article.");
        }
    })
    
    



app.listen(3000,()=>{
    console.log("server started on port 3000");
});
