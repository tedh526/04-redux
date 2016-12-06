import { convertAlbum, convertAlbums, convertSong, skip } from '../utils';
import { RECEIVE_ALBUMS, RECEIVE_ALBUM } from '../constants.js';
import axios from 'axios';

export const receiveAlbumsFromServer = (albums) => {

  return {
    type: RECEIVE_ALBUMS,
    albums: convertAlbums(albums)
  };
};

export const receiveAlbumFromServer = (album) => {
  return {
    type: RECEIVE_ALBUM,
    selectedAlbum: convertAlbum(album)
  };
};



export const fetchAlbumsFromServer =() => {
  return dispatch => {
    axios.get('/api/albums')
      .then(res => res.data)
      // use the dispatch method the thunkMiddleware gave us
      .then(albums => dispatch(receiveAlbumsFromServer(albums))); 
  }
}


export const fetchAlbumFromServer =(albumId) => {
  return dispatch => {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      // use the dispatch method the thunkMiddleware gave us
      .then(album => dispatch(receiveAlbumFromServer(album))); 
  }
}