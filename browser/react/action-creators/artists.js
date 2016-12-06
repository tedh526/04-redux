import { convertAlbum, convertAlbums, convertSong, skip } from '../utils';
import { RECEIVE_ARTISTS, RECEIVE_ARTIST } from '../constants.js';

export const receiveArtistsFromServer = (artists) => {
  return {
    type: RECEIVE_ARTISTS,
    artists
  };
};

export const receiveArtistFromServer = (artist, albums, songs) => {
  artist.albums = convertAlbums(albums)
  artist.songs = songs.map(convertSong)
  return {
    type: RECEIVE_ARTIST,
    selectedArtist: artist
  };
};



export const fetchArtistsFromServer =() => {
  return dispatch => {
    axios.get('/api/artists/')
      .then(res => res.data)
      // use the dispatch method the thunkMiddleware gave us
      .then(artists => dispatch(receiveArtistsFromServer(artists))); 
  }
}


export const fetchAlbumFromServer =(albumId) => {
  return dispatch => {
    Promise
      .all([
        axios.get(`/api/artists/${artistId}`),
        axios.get(`/api/artists/${artistId}/albums`),
        axios.get(`/api/artists/${artistId}/songs`)
      ])
      .then(res => res.map(r => r.data))
      .then(data => dispatch(receiveAlbumFromServer(...data)));
  }
}