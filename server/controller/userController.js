const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getUser = async (req, res, next) => {
    const { id } = req.query;
    console.log(id);
    await User.findOne({ _id: id }).exec((err, user) => {
        if (!user) res.status(409).send({ error: "User doesnt exist" });
        res.status(201).send(user);
    })
};

exports.addUser = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    const userInstance = new User({
        firstName,
        lastName,
        email,
        password,
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