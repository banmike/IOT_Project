var express = require("express");
var router = express.Router();
const actionhistoryController = require("../controller/ActionhistoryController");

router.get("/search", actionhistoryController.search);

module.exports = router;
