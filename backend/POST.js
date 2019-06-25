const express = require("express");
const router = express.Router();
const User = require("./modelUser.js");
const Media = require("./modelMedia.js");
const { ObjectID } = require("mongodb");
const middleware = require("./middleware");
const multer = require("multer");
const Image = require("./modelPicture.js");

const storage = require("multer-gridfs-storage")({
  url: "mongodb+srv://admin:12345@firstcluster-trvlr.azure.mongodb.net/tohacks"
});

const upload = multer({ storage: storage });

const sUpload = upload.single("image");

// expect username and password and email for signup
router.post("/signup/", sUpload, async function(req, res) {
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
  let Image;
  if (req.body.Image) {
    Image = new Image(req.body, Image);
  }
  db.collection("users").insert(toInsert, Image ? Image : null);
  return res.redirect("/login/");
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
