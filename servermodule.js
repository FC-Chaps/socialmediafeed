var http = require("http");
var twit = require("twit");
var mongo = require("mongodb");
var counter = 0;

var serverTools = module.exports = {

	tweetStore: {
		newTweet: (function addNewTweetMethod () {
			var propertyNumber = 0;
			return function newTweet (tweet) {
				propertyNumber += 1;
				var key = "tweet" + propertyNumber;
				this[key] = tweet;
			};
		})()
	},

	makeServer: function makeServer (port) {
		var server = http.createServer(function (request, response) {
			response.writeHead(200, {
				"Content-Type": "application/json",
				//SEE ABOUT CHANGING THIS TO ONE SITE
				"Access-Control-Allow-Origin": "*"
			});
			serverTools.getTwitterData("collectiveacademy");
			serverTools.addToDB(serverTools.tweetStore);
			serverTools.getFromDB(7);
			response.write(JSON.stringify(serverTools.tweetDelivery.payload));
		});
		server.listen(port);
	},

	getTwitterData: function getTwitterData (search) {
		tweets = new twit(require("./key.js"));
		tweets.get("search/tweets", { q: search }, function (err, allTweets) {
			if (err) {
				throw err;
			}
			allTweets.statuses.forEach(function (tweet) {
				if(tweet.entities && tweet.entities.media && tweet.entities.media[0].type === "photo"){
					var validTweet = {
						id: tweet.id,
						username: tweet.user.screen_name,
						image: tweet.entities.media[0].media_url,
						date: new Date(tweet.created_at),
						body: tweet.text
					};
					serverTools.tweetStore.newTweet(validTweet);
				}
			});
		});
		
	}, 

	addToDB: function addToDB (addDocument) {
		var mongoURI = require("./mongo.js").url;
		mongo.MongoClient.connect(mongoURI, function (err, db) {
				var collection = db.collection("tweets");
				Object.keys(addDocument).forEach(function (tweet) {
					collection.find( { id: addDocument[tweet].id }, function (err, cursor) {
						cursor.toArray(function(err, items){
							if(!items.length){
								collection.insert(addDocument[tweet], function (err, result) {});
							}
						})
					});
				});
		});
		
	},

	removeFromDB: function removeFromDB (tweetID) {
		var mongoURI = require("./mongo.js").url;
		mongo.MongoClient.connect(mongoURI, function (err, db) {
			var collection = db.collection("tweets");
			collection.remove( { "id": tweetID } );
		});
	},

	getFromDB: function getFromDB (quantity) {
		var mongoURI = require("./mongo.js").url;
		mongo.MongoClient.connect(mongoURI, function (err, db) {
			var collection = db.collection("tweets");
			collection.find().sort( { "id": -1 } ).limit(quantity).toArray(function (err, items) {
				console.log(counter);
				counter += 1;
				serverTools.tweetDelivery.payload = items;
			});
		})
	},

	tweetDelivery: {}
};

