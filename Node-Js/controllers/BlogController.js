const Blog = require('../models/Blogs')


const BlogController = {
    index:  async(req, res) => {
        res.redirect('/blogs')
      },
    BlogHome: async(req, res) => {
        let blogs = await Blog.find().sort({createdAt : -1});
        res.render("home", {
          blogs,
          title: "Home"
        });
      },
    saved: async(req, res) => {
        let {title, intro, body} = req.body;
      
        let blog = new Blog({
          title,
          intro,
          body 
        });
      
        await blog.save();
        res.redirect('/');
      
      },
    create: (req, res) => {
        res.render("blogs/create", {
          title: "Blog Create"
        });
      },
    delete: async (req, res, next)=>{
        try{
          let id = req.params.id;
          await Blog.findByIdAndDelete(id);
          res.redirect('/');
      
          }catch(e){
            console.log(e);
            next()
          }
      },
    singleblog: async (req, res, next)=>{
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
      }
}

module.exports = BlogController