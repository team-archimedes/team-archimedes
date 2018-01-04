const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let tweetSchema = mongoose.Schema({
  searchTerm: String,
  searchHour: Number, 
  // data: Object,
  averageScore: Number
});

// score: Number,
// searchTerm: String,
// timeStamp: String,
// tweetBody: String,
// user_location: String,
// user_name: String,
// avatar_url: String



let Tweet = mongoose.model('Tweet', tweetSchema);

let save = (tweet, callback) => {
  var newTweet = new Tweet(tweet);
  newTweet.save(callback);
}

let find = (term, callback) => {
	console.log('looking for results in database.');
	Tweet.find({searchTerm: term}).then((result) => {
		callback(result);
	});
}

module.exports.save = save;
module.exports.find = find;
