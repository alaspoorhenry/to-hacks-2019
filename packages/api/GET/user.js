var express = require("express");
var router = express.Router();
const user = require("../schema/user.js");

router.get("/users/", (res, req) => {
  user.findOne({}, (err, users) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.status(200).json(users);
  });
});

module.exports = router;
