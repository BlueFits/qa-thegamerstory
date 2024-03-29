var express = require('express');
var router = express.Router();

const { createBlog, getLatestBlog, getChars, updateBlog, getAllBlogs, deleteBlog } = require("../controller/blogController");
const { createBlogContent, getBlogContents, updateBlogContent, removeBlogContent } = require("../controller/blogContentController");

//Blog Content
router.post("/content/create", createBlogContent);

router.post("/content/update", updateBlogContent);

router.post("/content/remove", removeBlogContent);

router.get("/get_contents", getBlogContents);

//Blogs

router.post("/create", createBlog);

router.post("/udpate_blog", updateBlog);

router.post("/delete", deleteBlog);

router.get("/get_latest", getLatestBlog);

router.get("/get_chars", getChars);

router.get("/get_all_blogs", getAllBlogs);

module.exports = router;