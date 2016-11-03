'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var engphraseCtrlStub = {
  index: 'engphraseCtrl.index',
  show: 'engphraseCtrl.show',
  create: 'engphraseCtrl.create',
  upsert: 'engphraseCtrl.upsert',
  patch: 'engphraseCtrl.patch',
  destroy: 'engphraseCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var engphraseIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './engphrase.controller': engphraseCtrlStub
});

describe('Engphrase API Router:', function() {
  it('should return an express router instance', function() {
    expect(engphraseIndex).to.equal(routerStub);
  });

  describe('GET /api/engphrases', function() {
    it('should route to engphrase.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'engphraseCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/engphrases/:id', function() {
    it('should route to engphrase.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'engphraseCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/engphrases', function() {
    it('should route to engphrase.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'engphraseCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/engphrases/:id', function() {
    it('should route to engphrase.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'engphraseCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/engphrases/:id', function() {
    it('should route to engphrase.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'engphraseCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/engphrases/:id', function() {
    it('should route to engphrase.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'engphraseCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
