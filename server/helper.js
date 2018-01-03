var OAuth = require ('oauth')


module.exports.getTweet = (st, cb) => {
	var oauth = new OAuth.OAuth(
		'https://api.twitter.com/oauth/request_token',
		'https://api.twitter.com/oauth/access_token',
		window.CONSUMER_KEY,
		window.CONSUMER_SECRET,
		'1.0A',
		null,
		'HMAC-SHA1'
	);

	oauth.get(`https://api.twitter.com/1.1/search/tweets.json?q=${st}`, window.ACCESS_TOKEN, window.ACCESS_TOKEN_SECRET, function(e, data, res) {
		if (e) console.error(e)
		cb(data)
	})
}
<<<<<<< HEAD
=======

// exports.getTweet('trump', (data) => {console.log(data)})
>>>>>>> added a bunch of stuff to the package.json folder in regards to styling
