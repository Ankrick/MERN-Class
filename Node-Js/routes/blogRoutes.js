const express = require('express');
const router = express.Router();
const Blog = require('../models/Blogs');



router.get("/", async(req, res) => {
    res.redirect('/blogs')
  });
  
  router.get("/blogs", async(req, res) => {
    let blogs = await Blog.find().sort({createdAt : -1});
    res.render("home", {
      blogs,
      title: "Home"
    });
  });
  
  
  router.post("/blogs", async(req, res) => {
    let {title, intro, body} = req.body;
  
    let blog = new Blog({
      title,
      intro,
      body 
    });
  
    await blog.save();
    res.redirect('/');
  
  });
  
  router.get("/blogs/create", (req, res) => {
    res.render("blogs/create", {
      title: "Blog Create"
    });
  });
  
  //blog delete
  router.post('/blogs/:id/delete', async (req, res, next)=>{
    try{
      let id = req.params.id;
      await Blog.findByIdAndDelete(id);
      res.redirect('/');
  
      }catch(e){
        console.log(e);
        next()
      }
  })
  
  router.get('/blogs/:id', async (req, res, next)=>{
    try{
    let id = req.params.id;
    let blog = await Blog.findById(id);
    res.render('blogs/show', {
      blog,
      title : "Blog Detail"
    })}catch(e){
      console.log(e);
      next()
    }
  })

  module.exports = router;