const express = require("express");
const app = express();

app.use(express.urlencoded({extended:true}));

let morgan = require('morgan');
const mongoose = require('mongoose')
const Blog = require('./models/Blogs')
var expressLayouts = require('express-ejs-layouts');
const blogRoutes = require('./routes/blogRoutes')

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



app.get("/contact-us", (req, res) => {
  res.redirect("/contact", {
    title: "Contact"
  });
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

app.use(blogRoutes);

app.use((req, res) => {
  res.render("404", {title: "404"});
  res.status(404);
});


