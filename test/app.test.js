var app = require("../app.js");
var request = require('supertest');
request = request('http://0.0.0.0:*****')
var expect = require("chai").expect;


describe('When a user goes to the home page', function() {

    it("should return status code OK", function(done) {
        request.get('/')
            .expect(200, done);
    });

    it("is there a first twitter post with a date, image and user name", function(done) {
        request.get('/')
            .expect(/<div id = "post1">/, done);
    });
     it("is there a second twitter post with a date, image and user name", function(done) {
        request.get('/')
            .expect(/<div id = "post2">/, done);
    });
      it("is there a third twitter post with a date, image and user name'", function(done) {
        request.get('/')
            .expect(/<div id = "post3">/, done);
    });
       it("is there a fourth twitter post with a date, image and user name'", function(done) {
        request.get('/')
            .expect(/<div id = "post4">/, done);
    });
        it("is there a fith twitter post with a date, image and user name", function(done) {
        request.get('/')
            .expect(/<div id = "post5">/, done);
    });

});


