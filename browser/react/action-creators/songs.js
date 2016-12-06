import { RECEIVE_SONGS } from '../constants.js';
import axios from 'axios';
import { convertSong } from '../utils';

export const dumbSongs = (songs) => {
  return {
    type: RECEIVE_SONGS,
    songs: songs.map(convertSong)
  };
};


export const loadSongs = () => {
  return dispatch => {
    axios.get('/api/songs')
      .then(res => res.data)
      .then(songs => dispatch(dumbSongs(songs)));
    };
};
