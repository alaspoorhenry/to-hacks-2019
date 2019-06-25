// init dependencies
const mongodb = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID, MongoClient } = require("mongodb");
const cookie = require("cookie");
const session = require("express-session");
const multer = require("multer");
const app = express();
const middleware = require("./backend/middleware.js");
const Image = require("./backend/modelMedia");
const axios = require("axios");
const htmlArticleExtractor = require("html-article-extractor");
const jsdom = require("jsdom");
const request = require("request");
const CognitiveServicesCredentials = require("ms-rest-azure")
  .CognitiveServicesCredentials;
const TextAnalyticsAPIClient = require("azure-cognitiveservices-textanalytics");
const { JSDOM } = jsdom;

let credentials = new CognitiveServicesCredentials(
  "a93f0a47ddbf49139bba3d4cca3fdd90"
);

let client = new TextAnalyticsAPIClient(
  credentials,
  "https://eastus.api.cognitive.microsoft.com/"
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: true
  })
);

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
app.get("/login", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.use(express.static("public"));
app.get("/register", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.use(express.static("public"));
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/home.html");
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
const DELETE = require("./backend/DELETE.js");

app.use("/api", POST);
app.use("/api", GET);
app.use("/api", DELETE);

app.post("/api/text/", async function(req, res) {
  let body = req.body.text;
  let input = {
    documents: [{ language: "en", id: "1", text: body.replace(/["]+/g, "") }]
  };
  const operation = client.sentiment({
    multiLanguageBatchInput: input
  });
  operation
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      return res.json(err);
    });
});

app.post("/api/news/", async function(req, res) {
  let url = req.body.url;
  let rawDom;
  axios
    .get(url)
    .then(response => {
      rawDom = response.data;
      let dom = new JSDOM(rawDom);
      let body = dom.window.document.body;
      let result = htmlArticleExtractor(body);
      let bodyOne = {
        documents: [
          { language: "en", id: "1", text: result.text.replace(/['"]+/g, "") }
        ]
      };
      const operation = client.sentiment({
        multiLanguageBatchInput: bodyOne
      });
      operation
        .then(result => {
          return res.json(result);
        })
        .catch(err => {
          return res.json(err);
        });
    })
    .catch(error => {
      res.status(500).end(error);
    });
});

// keep this here in case of cookie shenanigans
app.post("/api/signin/", async function(req, res) {
  var username = req.body.name;
  var password = req.body.password;
  let userReturned = await db.collection("users").findOne({ name: username });
  if (userReturned === null) {
    return res.status(500).end("No username found");
  }
  //insecure but its a hackathon so could use salted hash
  if (userReturned.password !== password) {
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
  return res.redirect("/");
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
  return res.json("User signed out");
});

// patching in image
app.patch("/user/", middleware.isAuthenticated, sUpload, async function(
  req,
  res
) {
  try {
    let username = req.body.name;
    let image = new Image(req.body, req.file);
    db.collection("user").update(
      { name: username },
      { $set: { image: image } }
    );
  } catch (err) {
    res.status(500).end(err);
  }
});

app.post("/insert", (req, res) => {
  console.log("starting an insert");
  let data = {
    username: "user2",
    email: "user2@gmail.com",
    password: "abc123",
    image: "/home/lewd/Pictures/kitty-eth.svg"
  };
  db.collection("users").insertOne(data, function(err, res) {
    if (err) throw err;
    else console.log("1 document inserted");
  });
});

//Start server on port 3000
const listener = app.listen(3000, function() {
  console.log("Your app is listening on port " + 3000);
});
