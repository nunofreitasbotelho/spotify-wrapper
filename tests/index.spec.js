import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');


describe('Spotify Wrapper Library', () => {
  it('should create a new instance of SpotifyWrapper', () => {
    let spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceof(SpotifyWrapper);
  });
  it('should receive API_URL as an option', () => {
    let spotify = new SpotifyWrapper({
      apiURL: 'blabla',
    });
    expect(spotify.apiURL).to.be.equal('blabla');
  });
  it('should use default api url if not provided', () => {
    let spotify = new SpotifyWrapper({});
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });
  it('should receive the token as an option', () => {
    let spotify = new SpotifyWrapper({
      token: 'foo',
    });
    expect(spotify.token).to.be.equal('foo');
  });
  describe('Request Method', () => {
    let fetchedStub;
    let promise;
    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });
    afterEach(() => {
      fetchedStub.restore();
    });
    it('should have request method', () => {
      let spotify = new SpotifyWrapper({});
      expect(spotify.request).to.exist;
    });
    it('should call fetch when request', () => {
      let spotify = new SpotifyWrapper({
        token: 'foo',
      });
      spotify.request();
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call fetch with the right url passed', () => {
      let spotify = new SpotifyWrapper({
        token: 'foo',
      });
      spotify.request('url');
      expect(fetchedStub).to.have.been.calledWith('url');
    });
    it('should call fetch with the right headers', () => {
      let spotify = new SpotifyWrapper({
        token: 'foo',
      });
      const headers = {
        headers: {
          Authorization: `'Bearer foo'`,
        },
      };
      spotify.request('url');
      expect(fetchedStub).to.have.been.calledWith('url', headers);
    });
  });
});
