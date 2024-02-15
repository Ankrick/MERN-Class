const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title: {
        type : String,
        required : true
    },
    intro: {
        type : String,
        required: true
    },
    body :{
        type : String, 
        require : true
    }
}, {timestamps: true})

const Blog = mongoose.model('Blog', BlogSchema)
module.exports = Blog;