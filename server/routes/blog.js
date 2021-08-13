var express = require('express');
var router = express.Router();

const { createBlog, getLatestBlog } = require("../controller/blogController");
const { createBlogContent } = require("../controller/blogContentController");


router.post("/create", createBlog);

router.post("/content/create", createBlogContent);

router.get("/get_latest", getLatestBlog);

module.exports = router;