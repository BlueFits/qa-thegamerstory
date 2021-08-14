var express = require('express');
var router = express.Router();

const { createHub, addHistoryTitle, getHub } = require("../controller/hubController");

router.post("/create", createHub);

router.post("/add_history", addHistoryTitle);

router.get("/get_hub", getHub);

module.exports = router;