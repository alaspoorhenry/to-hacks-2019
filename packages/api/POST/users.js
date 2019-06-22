var express = require("express");
var router = express.Router();
const user = require("../schema/user.js");
const key = require("../schema/secret.js");

router.post("/signin/", (req, res) => {});

router.post("/signup/", (req, res) => {});

module.exports = router;
