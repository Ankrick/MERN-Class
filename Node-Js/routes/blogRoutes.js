const express = require('express');
const router = express.Router();
const Blog = require('../models/Blogs');
const BlogController = require('../controllers/BlogController');


router.get("/", BlogController.index);
router.get("/blogs", BlogController.BlogHome);
router.post("/blogs", BlogController.saved);
router.get("/blogs/create", BlogController.create);
router.post('/blogs/:id/delete', BlogController.delete)
router.get('/blogs/:id', BlogController.singleblog)
module.exports = router;