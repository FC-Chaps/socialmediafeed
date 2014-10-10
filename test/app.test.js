var app = require("../app.js");
var index = require("../index.js");
var server = require("../serverModule.js");
var request = require('supertest');
request = request('http://0.0.0.0:*****')
var expect = require("chai").expect;

-describe('When a user goes to the home page', function() {

// The following tests are for the websites html
describe('When a user goes to the home page', function() {
    var webSiteRequest = request("http//");
    it("should return status code OK", function(done) {
        request.get('/')
        .expect(200, done);
    });
    //These tests are for the main headers and paragraphs
    describe('The headers that the user is presented with', function() {
        it("is there a header for 'social media'", function(done) {
            request.get('/')
            .expect(/<h1>Social Media Feed/, done);
        });
        it("is there a header for '#CamdenCollective'", function(done) {
            request.get('/')
            .expect(/<h2>#CamdenCollective/, done);
        });
    });
    //These tests are for elements that are specific for each post.
    describe('The first post that the user sees', function() {
        it("is the correct div encapsulating the first post", function(done) {
            request.get('/')
            .expect(/<div class="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-0 post>/, done);
        });
    });
    describe('The second post that the user sees', function() {
        it("is the correct div encapsulating the second post", function(done) {
            request.get('/')
            .expect(/<div class="col-xs-10 col-xs-offset-1 col-md-5 col-md-offset-1 post" id="post2">/, done);
        });
    });
    describe('The third post that the user sees', function() {
        it("is the correct div encapsulating the third post", function(done) {
            request.get('/')
            .expect(/<div class="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-0 post" id="post3">/, done);
        });
    });
      describe('The fourth post that the user sees', function() {
        it("is the correct div encapsulating the fourth post", function(done) {
            request.get('/')
            .expect(/<div class="col-xs-10 col-xs-offset-1 col-md-11 col-md-offset-0 post" id="post4">/, done);
        });
    });
    describe('The fith post that the user sees', function() {
        it("is the correct div encapsulating the fith post", function(done) {
            request.get('/')
            .expect(/<div class="col-xs-10 col-xs-offset-1 col-md-11 col-md-offset-1 post" id="post5">/, done);
        });
    });
    //These tests are for the general classes used for each seperate post.
    describe('key classes that are essential for formating the posts', function() {
        it("is a class for posters usernames", function(done) {
            request.get('/')
            .expect(/class="username"/, done);
        });
         it("is a class for posters tweets text", function(done) {
            request.get('/')
            .expect(/class="tweet-text""/, done);
        });
         it("is a class for posters images", function(done) {
            request.get('/')
            .expect(/class="thetweet"/, done);
        });
         it("is a class for post dates", function(done) {
            request.get('/')
            .expect(/class="date"/, done);
        });
    });
});



//The following test are for the Ajax request and other methods in the index.js module.
describe('The website requests twitter data from the server using an ajax request', function() {
    it('have Ajax function called getContent', function (done) {
        expect(index.getContent).to.exist;
        done();
    })
    it('have Ajax function called getContent return an object', function (done) {
        expect(index.getContent()).to.be.an('object');
        done();
    })
    describe('the data from the AJax request is pushed into the dom', function() {
        it('have function called injectToDom which injects data into the dom', function (done) {
            expect(index.injectToDom).to.exist;
            done();
        })
    })
    describe('Have a function called jsonManipulator', function() {
        it('have function called jsonManipulator', function (done) {
            expect(index.jsonManipulator).to.exists;
            done();
        })         
        it('jsonManipulator returns a image url', function (done) {
            var vas = "http://";
            expect(index.jsonManipulator()).to.contain(vas);
            done();
        })
    });
});



//The following test are for the the server.js module.
describe('Requests from the site, the Node.js creates a server from which it listens for the Ajax request.', function() { 
	var vas = "http://"
    it('have function called createServer', function (done) {
        var serv = server.makeServer;
        expect(serv).to.be.a('function');
        done();
    })
    it('createServe should contain a url', function (done) {
    	var serv = server.makeServer;
    	expect(serv.toString()).to.contain(vas);
    	done();
    })
    it('check for the object tweetStore with method newTweet', function (done) {
    	expect(server.tweetStore).to.be.an('object');
    	done();
    })
    it('check that newTweet exists', function (done) {
    	expect(server.tweetStore.newTweet).to.exist;
    	done();
    }
    it('check that function getTwitterData exists', function (data) {
    	expect(server.getTwitterData).to.exits;
    	done();
    })
    //The following tests are check for the database.
    it('check that function addToDB exists') function (data) {
    	expect(server.addToDB).to.exits;
    	done();
    })
	it('check that the function getFromDB exists and returns an object', function (done) {
    	expect(server.getFromDB()).to.be.an('object');
    	done();
    })
})



//The following tests are for the heroku server and include checking that essential data is being served
describe('check that the heroku server is working', function() {
    var herokuRequest = request("http://chaps-server.herokuapp.com/");
    it("should return status code OK", function(done) {
        herokuRequest.get('/')
        .expect(200, done);
    });
	it("should have usernames ", function (done) {
        herokuRequest.get('/')
        .expect(/username/,done);
    });
    it("should have an image ", function (done) {
        herokuRequest.get('/')
        .expect(/image/,done);
    });
    it("should have usernames ", function (done) {
        herokuRequest.get('/')
        .expect(/username/,done);
    });
    it("should have tweets ", function (done) {
        herokuRequest.get('/')
        .expect(/tweet/,done);
    });
})


