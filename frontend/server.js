// init dependencies
const mongodb = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID, MongoClient } = require("mongodb");
const cookie = require("cookie");
const session = require("express-session");
const multer = require("multer");
const app = express();

app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: true
  })
);

app.use(bodyParser.json());

app.use(function(req, res, next) {
  req.user = req.session.user ? req.session.user : null;
  req.username = req.user ? req.user._id : "";
  var username = req.user ? req.user._id : "";
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("username", username, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    })
  );
  console.log("HTTP request", req.username, req.method, req.url, req.body);
  next();
});

/*
Add code to initialize driver adn connect to MongoDB Database
*/

const connectionString =
  "mongodb+srv://admin:12345@firstcluster-trvlr.azure.mongodb.net/tohacks";

// avatar middleware, I dunno if it works
const storage = require("multer-gridfs-storage")({
  url: connectionString
});
const upload = multer({ storage: storage });
const sUpload = upload.single("image");

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
const GET = require("./backend/GET.js");

app.use("/api", POST);
app.use("/api", GET);

// keep this here in case of cookie shenanigans
app.post("/signin/", async function(req, res) {
  var username = req.body.name;
  var password = req.body.password;
  let userReturned = await db.collection("users").findOne({ name: username });
  if (userReturned === null) {
    return res.status(500).end("No username found");
  }
  //insecure but its a hackathon so could use salted hash
  if (userReturned.password !== req.body.password) {
    return res.status(401).end("Forbidden due to incorrect credentials");
  }
  req.session.user = userReturned._id;
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("user", userReturned._id, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    })
  );
  return res.json(userReturned);
});

app.get("/testFind", (req, res) => {
  db.collection("users")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      else console.log(result);
    });
});

app.get("/api/signout/", function(req, res) {
  req.session.destroy();
  // sets this cookie to empty
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("user", "", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    })
  );
  return res.json("user signed out");
});

app.post("/insert", (req, res) => {
  let data = {
    username: "user1",
    email: "user1@gmail.com",
    password: "abc123",
    image: "/home/lewd/Pictures/kitty-eth.svg"
  };
  dbo.collection("users").insertOne(data, function(err, res) {
    if (err) throw err;
    else console.log("1 document inserted");
    db.close();
  });
});

//Start server on port 3000
const listener = app.listen(3000, function() {
  console.log("Your app is listening on port " + 3000);
});
