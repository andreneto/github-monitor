import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import router from './router';
import store from './store';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

ReactDOM.render(
  <Provider store={store}>{router}</Provider>,
  document.getElementById('main')
);
