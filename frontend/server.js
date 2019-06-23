// init dependencies
const mongodb = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID, MongoClient } = require("mongodb");
const cookie = require("cookie");
const session = require("express-session");
const app = express();

app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: true
  })
);

app.use(bodyParser.json());

/*
Add code to initialize driver adn connect to MongoDB Database
*/

const connectionString =
  "mongodb+srv://admin:12345@firstcluster-trvlr.azure.mongodb.net/tohacks";

// response header setter
app.use((req, res, next) => {
  // every domain can make requests so its sloppy right now
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(connectionString, { useNewUrlParser: true }, function(
  err,
  client
) {
  if (err) {
    console.log("ERROR: could not connect:", err);
    return;
  }
  db = client.db("tohacks");
  console.log("Cluster connected!");
});

//Application Routes | Links
app.use(express.static("public"));
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/login.html");
});

app.use(express.static("public"));
app.get("/register", function(request, response) {
  response.sendFile(__dirname + "/views/register.html");
});

app.use(express.static("public"));
app.get("/home", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

//DB QUERIES, routes to test that the MongoDB queries are working
app.get("/testFind", (req, res) => {
  db.collection("users")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);

      // res.render('index.ejs', {quotes: result})
      console.log(result);
    });
});

app.post("/testSave", (req, res) => {});

const POST = require("./backend/POST.js");

app.use("/api", POST);

app.post("/signup/", async function(req, res) {
  if (!("name" in req.body)) return res.status(400).end("username is missing");
  if (!("password" in req.body))
    return res.status(400).end("password is missing");
  var username = req.body.name;
  var password = req.body.password;
  let returnedDocument = await db
    .collection("users")
    .findOne({ name: username });
  console.log(returnedDocument);
  if (returnedDocument !== null) {
    return res.status(400).end("ERROR: User names must be unique");
  }
  console.log(returnedDocument);
  return res.json({ boi: "dasd" });
});

//Start server on port 3000
const listener = app.listen(3000, function() {
  console.log("Your app is listening on port " + 3000);
});
