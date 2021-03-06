var express = require("express");
var router = express.Router();
const Media = require("./modelMedia.js");
const User = require("./modelUser.js");
const middleware = require("./middleware");

router.get("/media/", async function(req, res) {
  let media = await db
    .collection("media")
    .find({})
    .toArray();
  media = media.sort(
    (elementOne, elementTwo) => elementOne.date - elementTwo.date
  );
  // paginated by 4
  return res.json(media.slice(0, 3));
});

// find results given userID from cookie
router.get("/media/:userID/", middleware.isAuthenticated, async function(
  req,
  res
) {
  const userID = req.params.userID;
  let media = await db
    .collection("media")
    .find({ usernameID: userID })
    .toArray();
  media = media.sort(
    (elementOne, elementTwo) => elementOne.date - elementTwo.date
  );
  // paginated by 4
  return res.json(media.slice(0, 3));
});

module.exports = router;
