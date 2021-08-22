const BlogContent = require("../models/BlogContent");
const Blog = require("../models/Blog");

exports.createBlogContent = async (req, res, next) => {
    const { type, content, blogID } = req.body;
    const blogContentInstance = new BlogContent({ type, content });
    await Blog.findById(blogID).exec(async (err, blog) => {
        if (err) {return next(err);}
        if (!blog) {
            res.status(400).send({ error: "Blog not found" });
        } else {
            blogContentInstance.save(async (err, blogContent) => {
                if (err) {return next(err);}
                const update = {
                    $set: {
                        blogContent: [...blog.blogContent, blogContent._id],
                    },
                };
                await Blog.findByIdAndUpdate(blog._id, update, {}, (err, result) => {
                    if (err) {return next(err);}
                    res.status(201).send(result);
                });
            });
        }
    });
};

exports.updateBlogContent = async (req, res, next) => {
    const { blogContentID, content, type } = req.body;
    console.log(blogContentID, content, type);
    const update = {
        $set: {
            content,
            type,
        },
    };
    BlogContent.findByIdAndUpdate(blogContentID, update, {}, (err, result) => {
        if (err) {return next(err);}
        res.status(200).send(result);
    });
}
//error here
exports.removeBlogContent = async (req, res, next) => {
    const { blogContentID } = req.body;
    console.log(blogContentID);
    BlogContent.findByIdAndDelete(blogContentID, {}, (err, result) => {
        if (err) {return next(err);}
        if (!result) {
            res.status(400).send({ error: "error in removing" })
        } else {
            console.log(result);
            res.status(200).send(result);
        }
    });
};

exports.getBlogContents = async (req, res, next) => {
    const { blogID } = req.query;
    const ObjectId = require('mongoose').Types.ObjectId;

    if (!ObjectId.isValid(blogID)) {
        res.status(400).send({ error: "Not a valid ID" });
    }

    await Blog.findById(blogID).populate("blogContent").exec((err, blog) => {
        if (err) {return next(err);}
        !blog ? res.status(400).send({ error: "No content" }) : res.status(200).send(blog);
    });
}