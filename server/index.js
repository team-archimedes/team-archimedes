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
var getTweet = require('./helper.js').getTweet; // helper function - see helper.js

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/search', function(req, res) {
  var searchTerm = req.body.searchTerm;
  getTweet(searchTerm, (data) => {
  	// callback function sends the tweets back to front end.
  	res.send(data)
  });
})



// app.post('/negatives', function(req, res) {
//   var tweets = req.body;
//   getTweets(tweets, (data) => {
//     if () {
//
//     }
//     res.send(data)
//   }) //probably have to do helpers.getTweets
// })

app.listen(3000, function() {
  console.log('listening on port 3000!');
});