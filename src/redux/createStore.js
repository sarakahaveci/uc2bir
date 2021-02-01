// @ts-nocheck
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import requestMiddleware from './requestMiddleware';
import reducers from './reducers';

const configureStore = () => {
  const middleware = [thunk, requestMiddleware];

  return createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
  );
};

export default configureStore;
