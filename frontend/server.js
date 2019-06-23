// init dependencies
const mongodb = require('mongodb');
const express = require('express');
const app = express();
bodyparser = require('body-parser');

/*
Add code to initialize driver adn connect to MongoDB Database
*/

//Application Routes | Links
app.use(express.static('public'));
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/login.html');
});

app.use(express.static('public'));
app.get('/register', function(request, response) {
  response.sendFile(__dirname + '/views/register.html');
});

app.use(express.static('public'));
app.get('/home', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

//DB QUERIES, routes to test that the MongoDB queries are working
app.get('/attendees',(req, res) =>{
    mysqlConnection.query('SELECT * FROM Users', (err, rows, fields)=>{
        if(!err)
          console.log(rows);
        else 
          console.log(err);
    })
});

//Start server on port 3000
const listener = app.listen(3000, function() {
  console.log('Your app is listening on port ' + 3000);
});


