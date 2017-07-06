import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from '../src/index';


chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Search', () => {
  let spotify;
  let fetchedStub;
  let promise;
  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  })
  afterEach(() => {
    fetchedStub.restore();
  });
  describe('Smoke Tests', () => {
    it('should exist the search method', () => {
      expect(spotify.search).to.exist;
    });

    it('should exist the spotify.search.albums method', () => {
      expect(spotify.search.albums).to.exist;
    });

    it('should exist the spotify.search.artists method', () => {
      expect(spotify.search.artists).to.exist;
    });

    it('should exist the spotify.search.tracks method', () => {
      expect(spotify.search.tracks).to.exist;
    });

    it('should exist the spotify.search.playlists method', () => {
      expect(spotify.search.playlists).to.exist;
    });
  });
  describe('Search Artists', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.artists('Rammstein');
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call fetch with the correct url', () => {
      const artists = spotify.search.artists('Rammstein');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Rammstein&type=artist');
    });
  });
  describe('Search Albums', () => {
    it('should call fetch function', () => {
      const albums = spotify.search.albums('Rammstein');
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call fetch with the correct url', () => {
      const albums = spotify.search.albums('Rammstein');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Rammstein&type=album');
    });
  });
  describe('Search Playlists', () => {
    it('should call fetch function', () => {
      const playlists = spotify.search.playlists('Rammstein');
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call fetch with the correct url', () => {
      const playlists = spotify.search.playlists('Rammstein');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Rammstein&type=playlist');
    });
  });
  describe('Search Tracks', () => {
    it('should call fetch function', () => {
      const tracks = spotify.search.tracks('Rammstein');
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call fetch with the correct url', () => {
      const tracks = spotify.search.tracks('Rammstein');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Rammstein&type=track');
    });
  });
});
