const Blog = require("../models/Blog");
const Hub = require("../models/Hub");

exports.createBlog = async (req, res, next) => {
    const { blogType, headerImage, headerTitle, headerSub, blogTitle, historyTitle, thumbnailImage, hub } = req.body;
    const blogInstance = new Blog({ 
        blogType, 
        headerImage, 
        headerTitle, 
        headerSub, 
        blogTitle, 
        historyTitle, 
        thumbnailImage,
        hub,
    });
    blogInstance.save((err, blog) => {
        if (err) {return next(err);}
        res.status(201).send(blog);
    });
}

exports.getAllBlogs = async (req, res, next) => {
    await Blog.find().exec((err, blogs) => {
        if (err) {return next(err);}
        if (blogs.length === 0) {
            res.status(400).send({ error: "No blogs" });
        } else {
            res.status(200).send(blogs);;
        }
    });
}

exports.updateBlog = async (req, res, next) => {
    const { blogID, blogType, headerImage, headerTitle, headerSub, blogTitle, historyTitle, thumbnailImage, isPrivate, hub } = req.body;
    await Blog.findById(blogID).exec(async (err, blog) => {
        if (err) {return next(err);}
        if (!blog) {
            res.status(404).send({ error: "Blog not found" });
        } else {
            const update = {
                $set: {
                    blogType: blogType || blog.blogType,
                    headerImage: headerImage || blog.headerImage,
                    headerTitle: headerTitle || blog.headerTitle,
                    headerSub: headerSub || blog.headerSub,
                    blogTitle: blogTitle || blog.blogTitle,
                    historyTitle: historyTitle || blog.historyTitle,
                    thumbnailImage: thumbnailImage || blog.thumbnailImage,
                    isPrivate: isPrivate === undefined ? blog.isPrivate : isPrivate,
                    hub: hub || blog.hub,
                },
            };
            await Blog.findByIdAndUpdate(blog._id, update, { new: true }, (err, result) => {
                if (err) {return next(err);}
                res.status(200).send(result);
            });
        }
    });
}

exports.getLatestBlog = async (req, res, next) => {
    const { hub } = req.query;
    await Hub.findOne({ name: hub || "" }).exec(async (err, hub) => {
        if (err) {return next(err);}
        if (!hub) {
            res.status(409).send({ error: "Hub Not Found" });
        } else {
            await Blog.findOne({}, {}, { sort: { 'created_at' : -1 } }, (err, blog) => {
                if (err) {return next(err);}
                if (!blog) {
                    res.status(409).send({ error: "No Blog Found" });
                } else {
                    res.status(200).send(blog);
                }
            });
        }
    });
}

exports.deleteBlog = async (req, res, next) => {
    const { blogID } = req.body;
    console.log(blogID);
    await Blog.findByIdAndDelete(blogID).exec((err, result) => {
        if (err) {return next(err);}
        if (!result) {
            res.status(400).send({ error: "Blog is not found" });
        } else {
            res.status(200).send(result);
        }
    });
}

exports.getChars = async (req, res, next) => {
    const { hub } = req.query;
    await Hub.findOne({ name: hub || "" }).exec(async (err, hub) => {
        if (err) {return next(err);}
        if (!hub) {
            res.status(409).send({ error: "Hub Not Found" });
        } else {
            await Blog.find({ blogType: "char" }).exec((err, chars) => {
                if (err) {return next(err);}
                if (!chars) {
                    res.status(409).send({ error: "No Characters Available" });
                } else {
                    res.status(200).send(chars);
                }
            });
        }
    });
}