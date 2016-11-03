'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var moviequoteCtrlStub = {
  index: 'moviequoteCtrl.index',
  show: 'moviequoteCtrl.show',
  create: 'moviequoteCtrl.create',
  upsert: 'moviequoteCtrl.upsert',
  patch: 'moviequoteCtrl.patch',
  destroy: 'moviequoteCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var moviequoteIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './moviequote.controller': moviequoteCtrlStub
});

describe('moviequote API Router:', function() {
  it('should return an express router instance', function() {
    expect(moviequoteIndex).to.equal(routerStub);
  });

  describe('GET /api/moviequotes', function() {
    it('should route to moviequote.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'moviequoteCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/moviequotes/:id', function() {
    it('should route to moviequote.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'moviequoteCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/moviequotes', function() {
    it('should route to moviequote.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'moviequoteCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/moviequotes/:id', function() {
    it('should route to moviequote.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'moviequoteCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/moviequotes/:id', function() {
    it('should route to moviequote.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'moviequoteCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/moviequotes/:id', function() {
    it('should route to moviequote.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'moviequoteCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
