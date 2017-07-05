import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Album', () => {
  let fetchedStub;
  let promise;
  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });
  afterEach(() => {
    fetchedStub.restore();
  });
  describe('Smoke Tests', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });
    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });
  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = getAlbum('Rammstein');
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should receive the correct url to fetch', () => {
      context('fetching only one type', () => {
        const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');
      });
    });
    it('should return the correct data form promise', () => {
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      promise.resolves({ album: 'name' });
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });
  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = getAlbums();
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call the correct url', () => {
      const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTk');
    });
    it('should return the correct data from promise', () => {
      promise.resolves({ album: 'name' });
      const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
      expect(albums.resolveValue).to.be.eql({ album: 'name' });
    });
  });
  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      const tracks = getAlbumTracks();
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call the correct url', () => {
      const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');
    });
    it('should return the correct data from promise', () => {
      promise.resolves({ album: 'name' });
      const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(tracks.resolveValue).to.be.eql({ album: 'name' });
    });
  });
});
