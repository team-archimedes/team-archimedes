var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
//require whatever file the getTweets function is in

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

// Due to express, when you load the page, it doesnt make a get request to '/', it simply serves up the dist folder
app.post('/search', function(req, res) {
  var tweets = req.body;
  getTweets(tweets, (data) => {res.send(data)}) //probably have to do helpers.getTweets
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
