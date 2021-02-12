import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import requestMiddleware from './requestMiddleware';
import storageMiddleware from './storageMiddleware';
import reducers from './reducers';

const configureStore = () => {
  const middleware = [thunk, requestMiddleware, storageMiddleware];

  let enhancer;

  if (process.env.NODE_ENV !== 'production') {
    enhancer = composeWithDevTools(applyMiddleware(...middleware));
  } else {
    enhancer = applyMiddleware(...middleware);
  }

  return createStore(reducers, enhancer);
};

export default configureStore;
