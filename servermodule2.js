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
				//SEE ABOUT CHANGING THIS TO ONE SITE
				"Access-Control-Allow-Origin": "*"
			});
			serverTools.addToDB(serverTools.tweetStore);
			console.log(serverTools.getFromDB(3));
			response.end(JSON.stringify(serverTools.getFromDB(3)));
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
/*
	removeFromDB: function removeFromDB (tweetID) {
		var mongoURI = require("./mongo.js").url;
		mongo.MongoClient.connect(mongoURI, function (err, db) {
			var collection = db.collection("tweets");
			collection.remove( { "id": tweetID } );
		});
	},
*/
	getFromDB: function getFromDB (quantity) {
		var mongoURI = require("./mongo.js").url;
		mongo.MongoClient.connect(mongoURI, function (err, db) {
			var collection = db.collection("tweets");
			/*console.log(collection.find(function (err, cursor) {
				cursor.toArray(function (err, item) {
					console.log(item);
				});
			}));*/
			collection.find().sort( { "date": -1 } ).limit(quantity).toArray(function (err, items) {
				//console.log(items);
				return items;
			});
			//console.log(collection.find().sort( { "date": -1 } ).limit(quantity).toArray(function(err, item){return item}));
			//return collection.find().sort( { "date": -1 } ).limit(quantity);
		});
	}
/*
	connectToMongo: function connectToMongo (callback) {
		var mongoURI = require("./mongo.js").url;
		mongo.MongoClient.connect(mongoURI, function (err, db) {
			callback();
		});
	}
*/
};

