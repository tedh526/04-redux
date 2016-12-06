import { createStore } from 'redux';
import reducer from './reducers/root-reducer.js';
import { applyMiddleware } from 'redux'

export default createStore(reducer);