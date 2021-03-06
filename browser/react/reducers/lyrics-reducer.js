import { SET_LYRICS } from '../constants.js';


const initialState = { text: '' };

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_LYRICS:
      return Object.assign({}, state, {
        text: action.lyric
      });
    default: return state;
  }
}