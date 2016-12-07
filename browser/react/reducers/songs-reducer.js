import { RECEIVE_SONGS } from '../constants.js';

export const initialPlayerState = {
 songs: []
};

export default function (state = initialPlayerState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_SONGS:
      newState.songs = action.songs;
      break;

    default:
      return state;

  }

  return newState;

}