const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Hub = require("../models/User");
const bcrypt = require("bcrypt");

exports.getUser = async (req, res, next) => {
    const { id } = req.query;
    console.log(id);
    await User.findOne({ _id: id }).populate("blogs").exec((err, user) => {
        if (!user) res.status(409).send({ error: "User doesnt exist" });
        res.status(201).send(user);
    })
};

exports.addUser = async (req, res, next) => {
    const { firstName, lastName, email, password, hub } = req.body;

    const userInstance = new User({
        firstName,
        lastName,
        email,
        password,
        hub: [hub],
    });

    await User.findOne({ email }).exec((err, user) => {
        if (err) {return next(err);}
        if (user) {
            res.status(409).send({ error: "User exists" });
        } else {
            userInstance.save((err, user) => {
                if (err) {return next(err);};
                res.status(201).send(user);
            });
        }
    });
};

exports.updateUser = async (req, res, next) => {
    const { userID, blogID } = req.body;
    console.log(userID, blogID);
    await User.findById(userID).exec(async (err, user) => {
        if (err) {return next(err);}
        if (!user) {
            res.status(400).send({ error: "User not found" });
        } else {
            const update = {
                $set: {
                    blogs: blogID ? [...user.blogs, blogID] : [...user.blogs],
                }
            }
            await User.findByIdAndUpdate(user._id, update, {}, (err, user) => {
                if (err) {return next(err);}
                res.status(200).send(user);
            });
        }
    });
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);
    await User.findOne({ email }).exec((err, user) => {
        if (err) {return next(err);}
        if (!user) {
            res.status(409).send({ error: "user doesnt exist" });
        } else {
            bcrypt.compare(password, user.password).then((match) => {
                if (match) {
                    //Create a token
                    const payload = { user: user.name };
                    const options = { expiresIn: "24h" };
                    const secret = "randomtoken";
                    const token = jwt.sign(payload, secret, options);

                    res.status(200).send({
                        token,
                        user,
                    });

                } else {
                    res.status(401).send("Auth error");
                }
            })
        }
    });
};