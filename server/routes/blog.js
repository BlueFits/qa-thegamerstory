var express = require('express');
var router = express.Router();

const { createBlog, getLatestBlog, getChars, updateBlog } = require("../controller/blogController");
const { createBlogContent } = require("../controller/blogContentController");


router.post("/create", createBlog);

router.post("/content/create", createBlogContent);

router.post("/udpate_blog", updateBlog);

router.get("/get_latest", getLatestBlog);

router.get("/get_chars", getChars);

module.exports = router;