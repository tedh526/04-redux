import { SET_LYRICS } from '../constants.js';


export const setLyrics = (lyric) => {
  return {
    type: SET_LYRICS,
    lyric: lyric
  };
};
