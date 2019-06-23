const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongo = require("mongodb");
const { ObjectID, MongoClient } = require("mongodb");

const user = require("./schema/user");

const connectionString =
  "mongodb+srv://admin:12345@firstcluster-trvlr.azure.mongodb.net/tohacks";

app.use(bodyParser.json());

//app.use(cors());

// response header setter
app.use((req, res, next) => {
  // every domain can make requests so its sloppy right now
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(connectionString, { useNewUrlParser: true }, function(
  err,
  client
) {
  if (err) {
    console.log("ERROR: could not connect:", err);
    return;
  }
  console.log("Cluster connected!");
});

const getUsers = require("./GET/user");

app.use("/api", getUsers);

const PORT = 3000;

// app.post("/test/", (req, res) => {
//   let username = "test";
//   let password = "test";
//   user.findOne({ username: username }, (err, usr) => {
//     if (err) return res.status(500).json({ error: err });
//     if (usr)
//       return res.status(409).end("username " + username + " already exists");
//     const newUser = new user();
//     newUser.username = username;
//     newUser.save(err => {
//       if (err) return res.status(500).json({ error: err });
//       return res.json("user " + username + " signed up");
//     });
//   });
// });

// app.get("/test/", (req, res) => {
//   user.find({}, (err, usr) => {
//     if (err) return res.status(500).json(err);
//     return res.status(200).json(usr);
//   });
// });

app.listen(PORT, () => {
  console.log("Started on :", PORT);
});
