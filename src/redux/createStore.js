import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

const configureStore = () => {
  return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
};

export default configureStore;
