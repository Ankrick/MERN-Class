const express = require("express");
const app = express();

app.use(express.urlencoded({extended:true}));

let morgan = require('morgan');
const mongoose = require('mongoose')
const Blog = require('./models/Blogs')
var expressLayouts = require('express-ejs-layouts');

//db url
let mongoURL = "mongodb+srv://Tristan:Tristan@cluster0.ufcwtjo.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoURL).then(()=>{
  console.log('connected to db')
  app.listen(3000, () => {
    console.log("app started running on port 3000");
  });
}).catch(e=>{
  console.log(e)
})

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set('layout', 'layouts/default');

app.use(morgan('dev'))
app.use(express.static('public'))


//adding blogs
app.get('/add-blog', async (req, res)=>{
  let blog = new Blog({
    title : 'blog title 3',
    intro : 'blog intro 3',
    body : 'blog body 3'
  });

  await blog.save();
  res.send('blog saved'); 
})




//sorting blogs by time
app.get("/", async(req, res) => {
  let blogs = await Blog.find().sort({createdAt : -1});


  res.render("home", {
    blogs,
    title: "Home"
  });
});

app.post("/blogs", async(req, res) => {
  let {title, intro, body} = req.body;

  let blog = new Blog({
    title,
    intro,
    body 
  });

  await blog.save();
  res.redirect('/');

});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About"
  });
})

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact"
  });
});

app.get("/blogs/create", (req, res) => {
  res.render("blogs/create", {
    title: "Blog Create"
  });
});

//single blog finder
app.get('/blogs/:id', async (req, res, next)=>{
  try{
  let id = req.params.id
  let blog = await Blog.findById(id);
  res.render('blogs/show', {
    blog,
    title : "Blog Detail"
  })}catch(e){
    console.log(e);
    next()
  }
})

app.get("/contact-us", (req, res) => {
  res.redirect("/contact", {
    title: "Contact"
  });
});


app.use((req, res) => {
  res.render("404", {title: "404"});
  res.status(404);
});


