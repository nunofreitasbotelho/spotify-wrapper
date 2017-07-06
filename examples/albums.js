global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

const spotify = new SpotifyWrapper({
  token: 'BQA-Uh_G70MwKgzh0Z_MRA85Geb_GQy5QVyHFzGVb91TlpLu8A763oEa25YHS55XPNXZrPxAF68dxUBED9GXGBv3Jc4xk8VFVqVQ6uQ45Apw6GkxRK_BiyDOPazKFPQfSrz8dibNKMwS0Bh_NGFgag',
});

const albums = spotify.search.albums('Incubus');

albums.then(data => data.albums.items.map(item => console.log(item.name)));
