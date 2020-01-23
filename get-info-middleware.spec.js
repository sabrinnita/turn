/* eslint-disable global-require */
const mockery = require('mockery');
const { expect } = require('chai');
const { mockResponse } = require('mock-req-res')

describe('get-info-middleware', () => {
  beforeEach(() => {
    mockery.enable({ warnOnReplace: false, warnOnUnregistered: false, useCleanCache: true });
  });
  afterEach(() => {
    mockery.disable();
    mockery.deregisterAll();
  });
  it.only('Return error when consume api', (done) => {
    const req = {
      body: {
        idRegion: 'fnkefnekfne'
      }
    };
    const res = mockResponse({ err: new Error('error') });
    const middleware = require('./get-info-middleware');
    middleware.getInfoMiddleware(req, res, () => {
      expect(res.status.to.be.equal(400));
    })
    done();
  });
  it('Return data when consume api', (done) => {
    const req = {
      body: {
        idRegion: '7',
        idComuna: '110',
        nombre: 'AHUMADA'
      }
    };
    const res = mockResponse();
    const middleware = require('./get-info-middleware');
    middleware.getInfoMiddleware(req, res, () => {
      expect(res.status.to.be.equal(200));
    })
    done();
  });
});
