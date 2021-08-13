var express = require('express');
var router = express.Router();

const { createHub } = require("../controller/hubController");

router.post("/create", createHub);


module.exports = router;