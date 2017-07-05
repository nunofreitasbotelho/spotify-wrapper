import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import { search, searchAlbums, searchArtists, searchPlaylists, searchTracks } from '../src/search';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
  let fetchedStub;
  let promise;
  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  })
  afterEach(() => {
    fetchedStub.restore();
  });
  describe('Smoke Tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });
  describe('Generic Search', () => {
    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should receive the correct url to fetch', () => {
      context('fetching only one type', () => {
        const artists = search('Rammstein', 'artist');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Rammstein&type=artist');

        const albums = search('Rammstein', 'album');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Rammstein&type=album');
      });
      context('fetching more than one type', () => {
        const artistsAndAlbums = search('Rammstein', ['artist', 'album']);
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Rammstein&type=artist,album');
      });
    });
    /*it('should return the json data from the promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('Rammstein', 'artist');
      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });*/
  });
  describe('Search Artists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Rammstein');
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call fetch with the correct url', () => {
      const artists = searchArtists('Rammstein');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Rammstein&type=artist');
    });
  });
  describe('Search Albums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('Rammstein');
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call fetch with the correct url', () => {
      const albums = searchAlbums('Rammstein');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Rammstein&type=album');
    });
  });
  describe('Search Playlists', () => {
    it('should call fetch function', () => {
      const playlists = searchPlaylists('Rammstein');
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call fetch with the correct url', () => {
      const playlists = searchPlaylists('Rammstein');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Rammstein&type=playlist');
    });
  });
  describe('Search Tracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks('Rammstein');
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call fetch with the correct url', () => {
      const tracks = searchTracks('Rammstein');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Rammstein&type=track');
    });
  });
});
