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
var getTweets = require('./helper.js').getTweet; // helper function - see helper.js
var helper = require('./helper.js');
var db = require('../database/index.js');
var sentiment = require('sentiment');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/search', function(req, res) {
  var searchTerm = req.body.searchTerm;
  console.log("searchTerm ", searchTerm)

  helper.getTweets(searchTerm, (data) => {
    res.send(data)
  })

})

app.post('/database', function(req, res) {
  var average = req.body.average;
  var searchTerm = req.body.searchTerm;
  console.log('average is ', average)
    db.save({
      searchTerm: searchTerm,
      averageScore: average,
      searchHour: Date.now()
    })
  res.end()
})
// searchTerm: tweet.searchTerm,
// score: sentiment(tweet.tweetBody).score,
// timeStamp: tweet.timeStamp,
// tweetBody: tweet.tweetBody,
// user_name: tweet.user_name,
// user_location: tweet.user_location,
// avatar_url: tweet.avatar_url

// })

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
