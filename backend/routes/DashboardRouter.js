var express = require("express");
var router = express.Router();
const dashboard = require("../controller/DashboardController");

router.post("/controll", dashboard.controll);

//export this router to use in our index.js
module.exports = router;
