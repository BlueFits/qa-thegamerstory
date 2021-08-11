const jwt = require("jsonwebtoken");

exports.validateToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    let result = null;

    if (authorizationHeader) {
        const token = req.headers.authorization.split(" ")[1];
        const options = { expiresIn: "24h" };
        try {
            result = jwt.verify(token, "randomtoken", options);
            req.decoded = result;
            next();
        } catch(err) {
            throw new Error(err);
        }
    } else {
        res.status(401).send({
            error: "Auth error. Token required.",
            status: 401,
        });
    }
};