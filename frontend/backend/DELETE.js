const express = require("express");
const router = express.Router();
const User = require("./modelUser.js");
const Media = require("./modelMedia.js");
const middleware = require("./middleware");

router.delete("/media/:mediaID", middleware.isAuthenticated, async function(
  req,
  res
) {
  let toDelete = await db.collection("media").find({ _id: req.params.mediaID });
  if (toDelete === null) {
    return res.status(500).end("No element to delete");
  }
  db.collection("media").remove({ _id: req.params.mediaID }, { justOne: true });
});

module.exports = router;
