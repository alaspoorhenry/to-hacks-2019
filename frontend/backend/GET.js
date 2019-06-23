var express = require("express");
var router = express.Router();
const Media = require("./modelMedia.js");
const User = require("./modelUser.js");

router.get("/media/", async function(req, res) {
  let media = await db
    .collection("media")
    .find({})
    .toArray();
  media = media.sort(
    (elementOne, elementTwo) => elementOne.date - elementTwo.date
  );
  // paginated by 5
  return res.json(media.slice(0, 4));
});
