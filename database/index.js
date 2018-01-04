const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let tweetSchema = mongoose.Schema({
  searchTerm: String,
  searchHour: Number,
  averageScore: Number
});

let Tweet = mongoose.model('Tweet', tweetSchema);

let getAllData = (callback) => {
  Tweet.find().then((data) => {callback(data)});
}

let save = (tweet, callback) => {
  var newTweet = new Tweet(tweet);
  newTweet.save(callback);
}

module.exports.save = save;
module.exports.getAllData = getAllData;
