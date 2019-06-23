// init dependencies
const mongodb = require("mongodb");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { ObjectID, MongoClient } = require("mongodb");

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
  db = client.db('tohacks');
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
  db.collection('users').find().toArray((err, result) => {
      if (err) 
        return console.log(err);
      else  
        console.log(result);
    })
});

app.post("/insert", (req, res) => {
  console.log('starting an insert')
  let data = {  username: "user2", email: "user2@gmail.com", password: "abc123", image: "/home/lewd/Pictures/kitty-eth.svg" };
  db.collection("users").insertOne(data, function(err, res) {
    if (err) 
      throw err;
    else
      console.log("1 document inserted");
  });  
});

//Start server on port 3000
const listener = app.listen(3000, function() {
  console.log("Your app is listening on port " + 3000);
});
