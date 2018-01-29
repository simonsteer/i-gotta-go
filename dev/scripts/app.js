import React from 'react';
import ReactDOM from 'react-dom';

import store from './store'
import { Provider } from 'react-redux';

import IGottaGo from './containers/IGottaGo'

ReactDOM.render(
  <Provider store={store}>
    <IGottaGo />
  </Provider>, document.querySelector('#root'));