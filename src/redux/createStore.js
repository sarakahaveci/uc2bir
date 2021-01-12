// @ts-nocheck
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import promiseMiddleware from 'redux-promise-middleware';

const configureStore = () => {
  return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
};

export default configureStore;
