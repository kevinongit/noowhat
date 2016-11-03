'use strict';

var app = require('../..');
import request from 'supertest';

var newEngphrase;

describe('Engphrase API:', function() {
  describe('GET /api/engphrases', function() {
    var engphrases;

    beforeEach(function(done) {
      request(app)
        .get('/api/engphrases')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          engphrases = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(engphrases).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/engphrases', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/engphrases')
        .send({
          name: 'New Engphrase',
          info: 'This is the brand new engphrase!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newEngphrase = res.body;
          done();
        });
    });

    it('should respond with the newly created engphrase', function() {
      expect(newEngphrase.name).to.equal('New Engphrase');
      expect(newEngphrase.info).to.equal('This is the brand new engphrase!!!');
    });
  });

  describe('GET /api/engphrases/:id', function() {
    var engphrase;

    beforeEach(function(done) {
      request(app)
        .get(`/api/engphrases/${newEngphrase._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          engphrase = res.body;
          done();
        });
    });

    afterEach(function() {
      engphrase = {};
    });

    it('should respond with the requested engphrase', function() {
      expect(engphrase.name).to.equal('New Engphrase');
      expect(engphrase.info).to.equal('This is the brand new engphrase!!!');
    });
  });

  describe('PUT /api/engphrases/:id', function() {
    var updatedEngphrase;

    beforeEach(function(done) {
      request(app)
        .put(`/api/engphrases/${newEngphrase._id}`)
        .send({
          name: 'Updated Engphrase',
          info: 'This is the updated engphrase!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedEngphrase = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEngphrase = {};
    });

    it('should respond with the original engphrase', function() {
      expect(updatedEngphrase.name).to.equal('New Engphrase');
      expect(updatedEngphrase.info).to.equal('This is the brand new engphrase!!!');
    });

    it('should respond with the updated engphrase on a subsequent GET', function(done) {
      request(app)
        .get(`/api/engphrases/${newEngphrase._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let engphrase = res.body;

          expect(engphrase.name).to.equal('Updated Engphrase');
          expect(engphrase.info).to.equal('This is the updated engphrase!!!');

          done();
        });
    });
  });

  describe('PATCH /api/engphrases/:id', function() {
    var patchedEngphrase;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/engphrases/${newEngphrase._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Engphrase' },
          { op: 'replace', path: '/info', value: 'This is the patched engphrase!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedEngphrase = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedEngphrase = {};
    });

    it('should respond with the patched engphrase', function() {
      expect(patchedEngphrase.name).to.equal('Patched Engphrase');
      expect(patchedEngphrase.info).to.equal('This is the patched engphrase!!!');
    });
  });

  describe('DELETE /api/engphrases/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/engphrases/${newEngphrase._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when engphrase does not exist', function(done) {
      request(app)
        .delete(`/api/engphrases/${newEngphrase._id}`)
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
