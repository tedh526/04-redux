import { createStore, applyMiddleware, combineReducers } from 'redux';
import lyricsReducer from './reducers/lyrics-reducer.js';
import playerReducer from './reducers/player-reducer.js';
import albumsReducer from './reducers/albums-reducer.js';
import artistsReducer from './reducers/artists-reducer.js';
import songsReducer from './reducers/songs-reducer.js';
import playlistsReducer from './reducers/playlists-reducer.js';
import createLogger from 'redux-logger';
import thunkMiddleWare from 'redux-thunk';


const reduxLogger = createLogger();

const middleWare = applyMiddleware(reduxLogger, thunkMiddleWare);

const reducer = combineReducers({
  lyrics: lyricsReducer,
  player: playerReducer,
  albumsState: albumsReducer,
  artistsState: artistsReducer,
  playlistsState: playlistsReducer,
  songsState: songsReducer
});

export default createStore(reducer, middleWare);
