import { createStore } from 'redux';
import { reducer } from './reducers/root-reducer.js';

export default createStore(reducer);