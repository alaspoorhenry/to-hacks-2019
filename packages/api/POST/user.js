var express = require("express");
var router = express.Router();
const user = require("../schema/user.js");

router.post("/signin/", (req, res) => {});

router.post("/signup/", (req, res) => {});

router.post("/test/", (req, res) => {
  let username = "test";
  let password = "test";
  user.findOne({ username: username }, (err, usr) => {
    if (err) return res.status(500).json({ error: err });
    if (usr)
      return res.status(409).end("username " + username + " already exists");
    var salt = server.generateSalt();
    var hash = server.generateHash(password, salt);
    const newUser = new user();
    newUser.username = username;
    newUser.salt = salt;
    newUser.hash = hash;
    newUser.save(err => {
      if (err) return res.status(500).json({ error: err });
      return res.json("user " + username + " signed up");
    });
  });
});

module.exports = router;
