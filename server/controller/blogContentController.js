const BlogContent = require("../models/BlogContent");
const Blog = require("../models/Blog");

exports.createBlogContent = async (req, res, next) => {
    const { type, content, blogID, createIndex } = req.body;
    const blogContentInstance = new BlogContent({ type, content });
    await Blog.findById(blogID).exec(async (err, blog) => {
        if (err) {return next(err);}
        if (!blog) {
            res.status(400).send({ error: "Blog not found" });
        } else {
            blogContentInstance.save(async (err, blogContent) => {
                if (err) {return next(err);}
                const blogContentUpdate = [...blog.blogContent];
                blogContentUpdate.splice(createIndex, 0, blogContent._id)
                const update = {
                    $set: {
                        blogContent: blogContentUpdate,
                    },
                };
                await Blog.findByIdAndUpdate(blog._id, update, { new: true }).populate("blogContent").exec((err, result) => {
                    if (err) {return next(err);}
                    if (!result) {
                        res.status(400).send({ error: "Blog not saved" });
                    } else {
                        const resultCopy = [...result.blogContent];
                        resultCopy.splice(createIndex + 1, 0, { type: "create" })
                        res.status(201).send(resultCopy);
                    }
                });
            });
        }
    });
};

exports.updateBlogContent = async (req, res, next) => {
    const { blogContentID, content, type } = req.body;
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
exports. removeBlogContent = async (req, res, next) => {
    const { blogContentID, blogID, createIndex } = req.body;
    console.log(blogContentID, blogID);
    await Blog.findByIdAndUpdate(blogID, { $pull: {blogContent: blogContentID} }, { new: true })
    .populate("blogContent")
    .exec(async (err, blog) => {
        if (err) {return next(err);}
        if (!blog) {
            res.status(400).send({ error: "error in removing from array" })
        } else {
            await BlogContent.findByIdAndDelete(blogContentID, {}, (err, result) => {
                if (err) {return next(err);}
                if (!result) {
                    res.status(400).send({ error: "error in removing" })
                } else {
                    const blogCopy = [...blog.blogContent];
                    blogCopy.splice(createIndex - 1, 0, { type: "create" })
                    res.status(201).send(blogCopy);
                }
            });
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