const Blog = require("../models/Blog");
const Hub = require("../models/Hub");

exports.createBlog = async (req, res, next) => {
    const { blogType, headerImage, headerTitle, headerSub, blogTitle, historyTitle, thumbnailImage } = req.body;
    const blogInstance = new Blog({ blogType, headerImage, headerTitle, headerSub, blogTitle, historyTitle, thumbnailImage });
    blogInstance.save((err, blog) => {
        if (err) {return next(err);}
        res.status(201).send(blog);
    });
}

exports.updateBlog = async (req, res, next) => {
    const { blogID, blogType, headerImage, headerTitle, headerSub, blogTitle, historyTitle, thumbnailImage } = req.body;
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
                },
            };
            await Blog.findByIdAndUpdate(blog._id, update, {}, (err, result) => {
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