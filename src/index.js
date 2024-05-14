import React from 'react';
import createRoot from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import createStore from './redux/createStore';
import './i18n';

import { BrowserRouter } from 'react-router-dom';
const store = createStore();

createRoot.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
