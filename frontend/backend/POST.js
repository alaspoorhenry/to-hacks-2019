const express = require("express");
const router = express.Router();
const User = require("./modelUser.js");
const Media = require("./modelMedia.js");
const { ObjectID } = require("mongodb");
const middleware = require("./middleware");

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

router.post("/media/", middleware.isAuthenticated, async function(req, res) {
  try {
    const mediaToInsert = new Media(req.body);
    const OID = ObjectID();
    db.collection("media").insert({
      _id: OID,
      ...mediaToInsert,
      usernameID: req.session.user
    });
  } catch (err) {
    return res.status(500).end(err);
  }
});

router.post("/media/", middleware.isAuthenticated, async function(req, res) {
  try {
    const mediaToInsert = new Media(req.body);
    db.collection("media").insert({
      ...mediaToInsert,
      usernameID: req.session.user
    });
  } catch (err) {
    return res.status(500).end(err);
  }
});

module.exports = router;
