import { RECEIVE_PLAYLISTS, RECEIVE_PLAYLIST } from '../constants.js';
import axios from 'axios';
import { convertSong } from '../utils';


export const receivePlaylistsFromServer = (playlists) => {
  return {
    type: RECEIVE_PLAYLISTS,
    playlists
  };
};

export const receivePlaylistFromServer = (playlist) => {
  playlist.songs = playlist.songs.map(convertSong);
  return {
    type: RECEIVE_PLAYLIST,
    selectedPlaylist: playlist
  };
};

export const selectPlaylist = (playlistId) => {
  return dispatch => {
    axios.get(`/api/playlists/${playlistId}`)
      .then(res => res.data)
      .then(playlist => dispatch(receivePlaylistFromServer(playlist)));
      };
};

export const selectPlaylists = () => {
  return dispatch => {
    axios.get(`/api/playlists/`)
      .then(res => res.data)
      .then(playlists => dispatch(receivePlaylistsFromServer(playlists)));
      };
};
