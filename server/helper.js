var OAuth = require ('oauth');
var key = require ('../config/twitter.js');

module.exports.getTweet = (st, cb) => {
	var oauth = new OAuth.OAuth(
		'https://api.twitter.com/oauth/request_token',
		'https://api.twitter.com/oauth/access_token',
		key.CONSUMER_KEY,
		key.CONSUMER_SECRET,
		'1.0A',
		null,
		'HMAC-SHA1'
	);

	oauth.get(`https://api.twitter.com/1.1/search/tweets.json?q=${st}&count=100`, key.ACCESS_TOKEN, key.ACCESS_TOKEN_SECRET, function(e, data, res) {
		if (e) { console.error(e) }
		let temp = JSON.parse(data).statuses
		// console.log('\n\nRAW JSON DUMP:\n', temp, '\n\n');
		let cleaned = []

		temp.map((tweet) => {
			var selectedData = {
				timeStamp: tweet.created_at,
				tweetBody: tweet.retweeted_status.text, 
				user_name: tweet.user.screen_name,
				user_location: tweet.user.location
			}

			cleaned.push(selectedData)
		});

	cb(cleaned);
	// console.log('\n\nCLEANED JSON:\n', cleaned, '\n\n');
	})
}

// exports.getTweet('trump', (data) => {console.log(data)})