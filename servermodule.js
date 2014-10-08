var http = require("http");
var twit = require("twit");


var serverTools = module.exports = {

	tweetStore: {
		newTweet: (function () {
			var propertyNumber = 0;
			return function newTweet (tweet) {
				propertyNumber += 1;
				var key = "tweet" + propertyNumber;
				this[key] = tweet;
			};
		})()
	},

	makeServer: function makeServer (port) {
		http.createServer(function (request, response) {
			response.writeHead(200, {"Content-Type": "application/json"});
			response.write(JSON.stringify(serverTools.tweetStore));
		}).listen(port);
	},

	getTwitterData: function getTwitterData (search) {
	
		tweets = new twit(require("./key.js"));
		tweets.get("search/tweets", { q: search }, function (err, allTweets) {

			if (err) {
				throw err;
			}

			allTweets.statuses.forEach(function (tweet) {
				if(tweet.entities && tweet.entities.media && tweet.entities.media[0].type === "photo"){
					var validTweet = {};
					validTweet.username = tweet.user.screen_name;
					validTweet.image = tweet.entities.media.media_url;
					validTweet.date = tweet.created_at;
					validTweet.body = tweet.text;
					serverTools.tweetStore.newTweet(validTweet);
				}
			});
		});
	}
};

