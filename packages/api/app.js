const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongo = require("mongodb");

var mongoClient = mongo.MongoClient;
var url =
  "mongodb+srv://admin:12345@firstcluster-trvlr.azure.mongodb.net/test?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: true }));

mongoClient.connect(url, function(err, db) {
  if (err) {
    console.log("ERROR: could not connect:", err);
    return;
  }
  console.log("Database created!");
  db.close();
});

app.use(bodyParser.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Started on :", PORT);
});
