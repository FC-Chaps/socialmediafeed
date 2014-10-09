var http = require("http");
var twit = require("twit");
var mongo = require("mongodb");

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
		http.createServer(function (request, response) {
			response.writeHead(200, {
				"Content-Type": "text/plain",
				"Access-Control-Allow-Origin": "*"
			});
			response.end(JSON.stringify(serverTools.tweetStore));
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
					var validTweet = {
					id: tweet.id,
					username: tweet.user.screen_name,
					image: tweet.entities.media[0].media_url,
					date: tweet.created_at,
					body: tweet.text
					};
					serverTools.tweetStore.newTweet(validTweet);
				}
			});
		});
		
	}, 

	addToDB: function addToDB (addDocument) {
		var mongoURI = "mongodb://<chaps>:<ontwitter>@linus.mongohq.com:10089/chaps-twitter";
		mongo.MongoClient.connect(mongoURI, function (err, db) {
				var collection = db.collection("tweets");
				Object.keys(addDocument).forEach(function (tweet) {
					var tweetExists = collection.find( { "id": addDocument[tweet] } );
					if (tweetExists) {
						return;
					} else {
						collection.insert(addDocument[tweet]);
					}
				});	
		});
		
	},

	removeFromDB: function removeFromDB (tweetID) {
		var mongoURI = "mongodb://<chaps>:<ontwitter>@linus.mongohq.com:10089/chaps-twitter";
		mongo.MongoClient.connect(mongoURI, function (err, db) {
			var collection = db.collection("tweets");
			collection.remove( { "id": tweetID } );
		});
	},

	getFromDB: function getFromDB (quantity) {
		var mongoURI = "mongodb://<chaps>:<ontwitter>@linus.mongohq.com:10089/chaps-twitter";
		mongo.MongoClient.connect(mongoURI, function (err, db) {
			var collection = db.collection("tweets");
			return collection.find().sort( { "date": -1 } ).limit(quantity);
		});
	},

	connectToMongo: function connectToMongo (callback) {
		var mongoURI = "mongodb://<chaps>:<ontwitter>@linus.mongohq.com:10089/chaps-twitter";
		mongo.MongoClient.connect(mongoURI, function (err, db) {
			callback();
		});
	}

};

