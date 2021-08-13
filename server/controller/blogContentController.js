const BlogContent = require("../models/BlogContent");

exports.createBlogContent = async (req, res, next) => {
    const { type, content } = req.body;
    const blogContentInstance = new BlogContent({ type, content });
    blogContentInstance.save((err, blogContent) => {
        if (err) {return next(err);}
        res.status(201).send(blogContent);
    });
}