const Blog = require("../models/Blog");
const Hub = require("../models/Hub");

exports.createBlog = async (req, res, next) => {
    const { headerTitle, headerSub, blogTitle, historyTitle, thumbnailImage } = req.body;
    const blogInstance = new Blog({ headerTitle, headerSub, blogTitle, historyTitle, thumbnailImage });
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
            res.status(409).send({ msg: "Hub Not Found" });
        } else {
            Blog.findOne({}, {}, { sort: { 'created_at' : -1 } }, (err, blog) => {
                if (err) {return next(err);}
                res.status(201).send(blog);
            });
        }
    });
}