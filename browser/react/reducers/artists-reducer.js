import { RECEIVE_ARTISTS, RECEIVE_ARTIST } from '../constants.js';

export const initialPlayerState = {
artists: [],
selectedArtist: {}
};

export default function (state = initialPlayerState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_ARTISTS:
      newState.artists = action.artists;
      break;

    case RECEIVE_ARTIST:
      newState.selectedArtist = action.selectedArtist;
      break;

    default:
      return state;

  }

  return newState;

}