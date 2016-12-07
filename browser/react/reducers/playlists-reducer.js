import { RECEIVE_PLAYLISTS, RECEIVE_PLAYLIST } from '../constants.js';

export const initialPlayerState = {
 playlists: [],
selectedPlaylist: {}
};

export default function (state = initialPlayerState, action) {


  const newState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_PLAYLISTS:
      newState.playlists = action.playlists;
      break;

    case RECEIVE_PLAYLIST:
      newState.selectedPlaylist = action.selectedPlaylist;
      break;

    default:
      return state;

  }

  return newState;

}