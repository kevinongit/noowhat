'use strict';

var app = require('../..');
import request from 'supertest';

var newMoviequote;

describe('Moviequote API:', function() {
  describe('GET /api/moviequotes', function() {
    var moviequotes;

    beforeEach(function(done) {
      request(app)
        .get('/api/moviequotes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          moviequotes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(moviequotes).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/moviequotes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/moviequotes')
        .send({
          name: 'New Moviequote',
          info: 'This is the brand new moviequote!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newMoviequote = res.body;
          done();
        });
    });

    it('should respond with the newly created moviequote', function() {
      expect(newMoviequote.name).to.equal('New Moviequote');
      expect(newMoviequote.info).to.equal('This is the brand new moviequote!!!');
    });
  });

  describe('GET /api/moviequotes/:id', function() {
    var moviequote;

    beforeEach(function(done) {
      request(app)
        .get(`/api/moviequotes/${newMoviequote._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          moviequote = res.body;
          done();
        });
    });

    afterEach(function() {
      moviequote = {};
    });

    it('should respond with the requested moviequote', function() {
      expect(moviequote.name).to.equal('New Moviequote');
      expect(moviequote.info).to.equal('This is the brand new moviequote!!!');
    });
  });

  describe('PUT /api/moviequotes/:id', function() {
    var updatedMoviequote;

    beforeEach(function(done) {
      request(app)
        .put(`/api/moviequotes/${newMoviequote._id}`)
        .send({
          name: 'Updated Moviequote',
          info: 'This is the updated moviequote!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedMoviequote = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMoviequote = {};
    });

    it('should respond with the original moviequote', function() {
      expect(updatedMoviequote.name).to.equal('New Moviequote');
      expect(updatedMoviequote.info).to.equal('This is the brand new moviequote!!!');
    });

    it('should respond with the updated moviequote on a subsequent GET', function(done) {
      request(app)
        .get(`/api/moviequotes/${newMoviequote._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let moviequote = res.body;

          expect(moviequote.name).to.equal('Updated Moviequote');
          expect(moviequote.info).to.equal('This is the updated moviequote!!!');

          done();
        });
    });
  });

  describe('PATCH /api/moviequotes/:id', function() {
    var patchedMoviequote;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/moviequotes/${newMoviequote._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Moviequote' },
          { op: 'replace', path: '/info', value: 'This is the patched moviequote!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedMoviequote = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedMoviequote = {};
    });

    it('should respond with the patched moviequote', function() {
      expect(patchedMoviequote.name).to.equal('Patched Moviequote');
      expect(patchedMoviequote.info).to.equal('This is the patched moviequote!!!');
    });
  });

  describe('DELETE /api/moviequotes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/moviequotes/${newMoviequote._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when moviequote does not exist', function(done) {
      request(app)
        .delete(`/api/moviequotes/${newMoviequote._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
