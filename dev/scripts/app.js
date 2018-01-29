import React from 'react';
import ReactDOM from 'react-dom';

import store from './store'
import { Provider } from 'react-redux';

import Main from './components/main'

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>, document.querySelector('#root'));