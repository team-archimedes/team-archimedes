var OAuth = require ('oauth')


module.exports.getTweet = (st, cb) => {
	var oauth = new OAuth.OAuth(
		'https://api.twitter.com/oauth/request_token',
		'https://api.twitter.com/oauth/access_token',
		'PcKFVmwxY7UGi5r3TyWhy0hyE',
		'Vgr1vIIi3bMJqCZBtgTHqJf8vk72uhKR8nDCEzMNH5gPMFkTjp',
		'1.0A',
		null,
		'HMAC-SHA1'
	);

	oauth.get(`https://api.twitter.com/1.1/search/tweets.json?q=${st}`, '751413619473027072-y34S4KyFxP5bdFuUFc8omIkUMn1ZwB4', 'lw2xmOIMc0ZWaOvNgkBeGu8zmjgDtvwpRrryA68tms0Lu', function(e, data, res) {
		if (e) console.error(e)
		cb(data)
	})
}
