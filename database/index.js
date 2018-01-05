const mongoose = require('mongoose');
mongoose.connect('mongodb://greenfield:greenfield@ds245347.mlab.com:45347/greenfield');

let tweetSchema = mongoose.Schema({
  searchTerm: String,
  searchHour: Number,
  averageScore: Number
});

let Tweet = mongoose.model('Tweet', tweetSchema);


let addToSearchTerms = (term, callback) => {
	// console.log('adding ' + term.searchTerm + ' to database of search terms.');
  Tweet.find({searchTerm: term.searchTerm}).then((res) => {
    if (res.length === 0) {
      var newTerm = new Tweet(term);
      newTerm.save(callback);
    } else {
      console.log('already saved!')
    }
  })
}

let getAllTermData = (callback) => {
  var uniqueTerms = []
  Tweet.find().then((data) => {
    data.forEach((e) => {
      if (uniqueTerms.indexOf(e.searchTerm) < 0) {
        uniqueTerms.push(e.searchTerm)
      } else {
      
      }
    })
    callback(uniqueTerms)
  });
}


let getAllData = (callback) => {
  Tweet.find().then((data) => {callback(data)});
}

let save = (tweet, callback) => {
  var newTweet = new Tweet(tweet);
  newTweet.save(callback);
}

let find = (term, callback) => {
	Tweet.find({searchTerm: term}).then((result) => {
		callback(result);
	});
}

module.exports.save = save;
module.exports.getAllData = getAllData;
module.exports.find = find;
module.exports.addToSearchTerms = addToSearchTerms;
module.exports.getAllTermData = getAllTermData;
