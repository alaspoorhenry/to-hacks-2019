var express = require("express");
var router = express.Router();
const User = require("./models.js");

// expect username and password and email for signup
router.post("/signup/", async function(req, res) {
  if (!("name" in req.body)) return res.status(400).end("username is missing");
  if (!("password" in req.body))
    return res.status(400).end("password is missing");
  if (!("email" in req.body)) return res.status(400).end("email is missing");
  var username = req.body.name;
  let returnedDocument = await db
    .collection("users")
    .findOne({ name: username });
  if (returnedDocument !== null) {
    return res.status(400).end("ERROR: User names must be unique");
  }
  const toInsert = new User(req.body);
  db.collection("users").insert(toInsert);
  return res.redirect("/");
});

router.post("/signin/", async function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
});

module.exports = router;
