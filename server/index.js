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
var db = require('../database/index.js');
var sentiment = require('sentiment');
var cron = require('node-cron');

// helper functions - see helper.js
var getTweets = require('./helper.js').getTweets; 
var cronJob = require('./helper.js').cronJob;


cron.schedule('*/30 * * * *', () => {
  // call helper function every half-hour
  cronJob();
});

var sanitizeHTML = require('sanitize-html')


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/search', function(req, res) {

  var searchTerm = sanitizeHTML(req.body.searchTerm) || 'undefined';
  db.addToSearchTerms({searchTerm: searchTerm});

  getTweets(searchTerm, (data) => {
  helper.getTweets(searchTerm, (data) => {
    res.send(data)
  });

})

app.post('/database', function(req, res) {
  var average = req.body.average;
  var searchTerm = req.body.searchTerm;
  console.log('average is ', average)
  if ( average !== null ) {
    db.save({
      searchTerm: searchTerm,
      averageScore: average,
      searchHour: Date.now()
    });
  }
  res.end()
})

app.get('/previousSearches', (req, res) => {
  //shouldn't need to do .searchTerm beacuse already doing the hing
  db.getAllData((data) => {
    res.send(data); //array of objects
  })
})


app.get('/database', (req, res) => {
  // query the database for the search term and return all matches.
  db.find(req.query.searchTerm, (results) => {
    res.send(results);
  });

});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
