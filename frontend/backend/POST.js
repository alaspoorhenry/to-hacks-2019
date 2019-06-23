var express = require("express");
var router = express.Router();
const User = require("./models.js");

router.post("/signup/", (req, res) => {
  console.log(req.body);
  if (!("name" in req.body)) return res.status(400).end("username is missing");
  if (!("password" in req.body))
    return res.status(400).end("password is missing");
  var username = req.body.username;
  var password = req.body.password;
  let returnedDocument = db.collection("users").findOne({ name: username });
  if (returnedDocument !== undefined) {
    return res.status(400).end("ERROR: User names must be unique");
  }
});

router.post("/users/", (req, res) => {
  userData = {
    name: "dog",
    password: "frog",
    email: "email",
    image: "boi"
  };
  return res.json(new User(userData));
});

module.exports = router;
