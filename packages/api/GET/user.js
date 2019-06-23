const express = require("express");
const router = express.Router();
const user = require("../schema/user.js");

router.get("/users/", (req, res) => {
  user.find({}, (err, users) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.json(users);
  });
});

module.exports = router;
