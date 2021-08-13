const Hub = require("../models/Hub");

exports.createHub = async (req, res, next) => {
    const { name, image } = req.body;

    const hubInstance = new Hub({
        name, 
        image,
    });

    await Hub.findOne({ name }).exec((err, hub) => {
        if (err) {return next(err);}
        if (hub) {
            res.status(409).send("Hub already exists");
        } else {
            hubInstance.save((err, hub) => {
                if (err) {return next(err);}
                res.status(201).send(hub);
            });
        }
    });
}