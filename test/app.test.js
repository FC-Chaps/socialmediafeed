var ajax = require("../ajax.js");
var server = require("../server.js");
var request = require('supertest');
//request = request('http://0.0.0.0:*****')
var expect = require("chai").expect;


describe('When a user goes to the home page', function() {


    it("should return status code OK", function(done) {
        request.get('/')
            .expect(200, done);
    })

    it("the user is presented with the title 'Twitter Feed' in the top left of the page.", function(done) {
         request.get('/')
            .expect(/Twitter Feed/, done);
    })

    it("is there a first twitter post with a date, image and user name", function(done) {
        request.get('/')
            .expect(/<div id = "post1">/);
    })

     it("is there a second twitter post with a date, image and user name", function(done) {
        request.get('/')
            .expect(/<div id = "post2">/, done);
    })

      it("is there a third twitter post with a date, image and user name'", function(done) {
        request.get('/')
            .expect(/<div id = "post3">/, done);
    })

       it("is there a fourth twitter post with a date, image and user name'", function(done) {
        request.get('/')
            .expect(/<div id = "post4">/, done);
    })

        it("is there a fith twitter post with a date, image and user name", function(done) {
        request.get('/')
            .expect(/<div id = "post5">/, done);
    })
});



describe('The website requests twitter data from the server using an ajax request', function() {


    it('have Ajax function called getContent', function (done) {
        expect(ajax.getContent).to.exist;
        done();
    })

    it('have Ajax function called getContent return an object', function (done) {
        expect(ajax.getContent()).to.be.an('object');
        done();
    })

    it('have function called injectToDom which injects data into the dom', function (done){
        expect(ajax.injectToDom).to.exist;
        done();
    })

    it('have function called jsonManipulator which manipulates the json object and returns a variable tweet', function (done){
        expect(ajax.jsonManipulator().tweet).to.contain('Collective');
        done();
    })

    it('have function called jsonManipulator which manipulates the json object and returns a variable date', function (done){
        expect(ajax.jsonManipulator().date).to.contain('2014');
        done();
    })

    it('have function called jsonManipulator which manipulates the json object and returns a variable date', function (done){
        expect(ajax.jsonManipulator().image).to.be.an('img');
        done();
    })
});


