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
            res.status(409).send({ error: "Hub already exists" });
        } else {
            hubInstance.save((err, hub) => {
                if (err) {return next(err);}
                res.status(201).send(hub);
            });
        }
    });
}

exports.addHistoryTitle = async (req, res, next) => {
    const { title, hubName } = req.body;

    await Hub.findOne({ name: hubName }).exec(async (err, hub) => {
        if (err) {return next(err);}
        if (!hub) {
            res.status(409).send({ error: "No hub found" });
        } else {
            const update = {
                $set: {
                    history: [...hub.history, title],
                },
            };
            await Hub.findByIdAndUpdate(hub._id, update, {}, (err, result) => {
                if (err) {return next(err);}
                res.status(200).send(result);
            });
        }
    });
};

exports.getHub = async (req, res, next) => {
    const { hubName } = req.query;
    await Hub.findOne({ name: hubName }).exec((err, hub) => {
        if (err) {return next(err);}
        if (!hub) {
            res.status(409).send({ error: "No hub found" });
        } else {
            res.status(200).send(hub);
        }
    });
}