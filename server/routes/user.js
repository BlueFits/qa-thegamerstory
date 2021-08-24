var express = require('express');
var router = express.Router();

const { addUser, login, updateUser, getUser } = require("../controller/userController");
const { validateToken } = require("../middleware/utils");


router.post("/add", addUser);

router.post("/login", login);

router.post("/update", updateUser);

router.get("/get_data", getUser);

router.get("/test", validateToken, (req, res, next) => {
    res.send("protected");
});

module.exports = router;