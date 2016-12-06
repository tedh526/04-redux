import { createStore, applyMiddleware, combineReducers } from 'redux';
import lyricsReducer from './reducers/lyrics-reducer.js';
import playerReducer from './reducers/player-reducer.js';
import createLogger from 'redux-logger';
import thunkMiddleWare from 'redux-thunk';


const reduxLogger = createLogger();

const middleWare = applyMiddleware(reduxLogger, thunkMiddleWare);

const reducer = combineReducers({
  lyrics: lyricsReducer,
  player: playerReducer
});

export default createStore(reducer, middleWare);
