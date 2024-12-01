const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const _ =require("lodash");

const homeStartingContent="The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content"
const aboutContent="The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum."
const contactContent="Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:"
const posts=[];

const app=express();
app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.render('home',{homeStartingContent:homeStartingContent,
                        posts:posts});
    
})

app.get("/about",(req,res)=>{
    res.render('about',{aboutContent:aboutContent});
})

app.get("/contact",(req,res)=>{
    res.render('contact',{contactContent:contactContent});
})

app.get("/compose",(req,res)=>{
    res.render('compose');
    
})

app.post("/compose",(req,res)=>{

    const post={
        blogPostTttle:req.body.blogTitle,
        blogPostBody:req.body.blogBody
    }
    posts.push(post);
    res.redirect('/');
})

//exprexss routing parameters used for home ejs toable to fetch all the parameter in the url


app.get("/posts/:title",(req,res)=>{
    let requestedTitle=_.lowerCase(req.params.title);
    posts.forEach((post)=>{
        const storedTitle=_.lowerCase(post.blogPostTttle);
        if( storedTitle === requestedTitle){
            res.render('post',{
                                specficBlogTitle:post.blogPostTttle,
                                specficBlogBlog:post.blogPostBody})
        }else{
            console.log('much not found')
        }
    })
})


app.listen(3000,()=>{
    console.log('server is starting in port 3000');
})