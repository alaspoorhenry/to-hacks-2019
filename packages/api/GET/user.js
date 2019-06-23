const express = require("express");
const router = express.Router();
const user = require("../schema/user.js");

module.exports = function(app) {};

router.get("/users/", (res, req) => {
  user.findOne({}, (err, users) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.status(200).json(users);
  });
});

module.exports = router;
