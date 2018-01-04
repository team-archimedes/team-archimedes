///////////////////////////////////////////////////////////////////
//
// This file sets up the express routes for our app. 
//
///////////////////////////////////////////////////////////////////

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var axios = require('axios');
var getTweets = require('./helper.js').getTweets; // helper function - see helper.js

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/search', function(req, res) {
  var searchTerm = req.body.searchTerm;
  getTweets(searchTerm, (data) => {
  	// callback function sends the tweets back to front end.
  	res.send(data)
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});