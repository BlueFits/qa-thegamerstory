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

exports.getLatestBlog = async (req, res, next) => {
    const { hub } = req.query;
    Hub.findOne({ name: hub || "" }).exec((err, hub) => {
        if (err) {return next(err);}
        if (!hub) {
            res.status(409).send({ error: "Hub Not Found" });
        } else {
            Blog.findOne({}, {}, { sort: { 'created_at' : -1 } }, (err, blog) => {
                if (err) {return next(err);}
                if (!blog) {
                    res.status(409).send({ error: "No Blog Found" });
                } else {
                    res.status(201).send(blog);
                }
            });
        }
    });
}

exports.getChars = async (req, res, next) => {
    const { hub } = req.query;
    Hub.findOne({ name: hub || "" }).exec((err, hub) => {
        if (err) {return next(err);}
        if (!hub) {
            res.status(409).send({ error: "Hub Not Found" });
        } else {
            Blog.find({ blogType: "char" }).exec((err, chars) => {
                if (err) {return next(err);}
                if (!chars) {
                    res.status(409).send({ error: "No Characters Available" });
                } else {
                    res.status(201).send(chars);
                }
            });
        }
    });
}