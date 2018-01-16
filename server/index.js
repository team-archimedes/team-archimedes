///////////////////////////////////////////////////////////////////
//
// This file sets up the express routes for our app.
//
///////////////////////////////////////////////////////////////////

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')
const app = express();
const axios = require('axios');
const db = require('../database/index.js');
const sentiment = require('sentiment');
const cron = require('node-cron');
const pgDB = require('../database/real-database/config.js')

// helper functions - see helper.js
const getTweets = require('./helper.js').getTweets; 
const cronJob = require('./helper.js').cronJob;


cron.schedule('*/30 * * * *', () => {
  // call helper function every half-hour
  cronJob();
});

const sanitizeHTML = require('sanitize-html')
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/search', function(req, res) {

  const searchTerm = sanitizeHTML(req.body.searchTerm) || 'undefined';
  searchTerm.split(`'`).join('').split('#').join('').split('"').join('').split('/').join('').split('`').join('')

  db.addToSearchTerms({searchTerm: searchTerm});

  getTweets(searchTerm, (data) => {
    res.send(data)
  });

})

app.post('/database', function(req, res) {
  const average = req.body.average;
  const searchTerm = req.body.searchTerm;
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

app.listen(process.env.PORT || 3000, function() {
  console.log('listening on port 3000!');
});
