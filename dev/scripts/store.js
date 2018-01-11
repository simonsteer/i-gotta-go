import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware';

import { compose } from 'redux'

import reducers from './reducers';

const middleware = applyMiddleware(promise(), thunk, createLogger())

export default createStore(reducers, {}, middleware)