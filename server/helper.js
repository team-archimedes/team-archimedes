/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// getTweets() does the work of querying the twitter API and then
// executes the callback function from index.js with the results.
//
// We used the oauth npm module to handle authorization with the twitter api.
// oauth module docs: https://www.npmjs.com/package/oauth
// twitter api docs: https://developer.twitter.com/en/docs/basics/authentication/guides/authorizing-a-request
//
// cronJob() does the work of grabbing all searchTerms out of the database and then calling getTweets() on 
// each searchTerm, in order to get a richer data set over time.
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

var OAuth = require ('oauth');
var key = require ('../config/twitter.js');
var sentiment = require('sentiment');
var db = require('../database/index.js');

cronJob = () => {
	console.log('cronJob!');
	
	db.getAllTermData((res) => {
	// step one - get all search terms
    res.forEach((term) => {
      term = term || 'flock';
    // iterate over all search terms
      getTweets(term, (data) => {
      	// get new tweets for each term
        console.log("Successful CronJob")
        var neg = [];

        data.forEach((tweet) => {
        	// iterate through all tweets for that term, and calculate average sentiment
          var score = sentiment(tweet.tweetBody).score;
          if (score < 0 ) {
            neg.push(tweet);
          }
        });

        var average = (neg.length/data.length) * 100
        // save new data to database of se
        db.save({
          searchTerm: term.searchTerm,
          averageScore: average,
          searchHour: Date.now()
        });

      });
    });
  });
	
	
}

getTweets = (st, cb) => {
	var oauth = new OAuth.OAuth(
		'https://api.twitter.com/oauth/request_token',
		'https://api.twitter.com/oauth/access_token',
		key.CONSUMER_KEY,
		key.CONSUMER_SECRET,
		'1.0A',
		null,
		'HMAC-SHA1'
	);

	oauth.get(`https://api.twitter.com/1.1/search/tweets.json?q=${st}&count=100&tweet_mode=extended`, key.ACCESS_TOKEN, key.ACCESS_TOKEN_SECRET, function(e, data, res) {
		if (e) { 
			console.error(e);
			cb([]);
		} else {
			let temp = JSON.parse(data).statuses
			let cleaned = []
			console.log('ST IS ', st)

			temp.map((tweet) => {
				var selectedData = {
					// score: sentiment(tweet).score,
					searchTerm: st,
					timeStamp: tweet.created_at,
					// if tweet has been retweeted, its full text lives in the retweeted_status object
					tweetBody: tweet.retweeted_status ? tweet.retweeted_status.full_text : tweet.full_text,
					user_name: tweet.user.screen_name,
					user_location: tweet.user.location,
					avatar_url: tweet.user.profile_image_url
				}

				cleaned.push(selectedData)
			});

		cb(cleaned);

		}
		});
}

module.exports.getTweets = getTweets;
module.exports.cronJob = cronJob;
