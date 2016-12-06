import { createStore } from 'redux';
import reducer from './reducers/root-reducer.js';
import { applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleWare from 'redux-thunk'

const reduxLogger = createLogger()

const middleWare = applyMiddleware(reduxLogger, thunkMiddleWare)

export default createStore(reducer, middleWare);