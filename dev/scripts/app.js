import React from 'react';
import ReactDOM from 'react-dom';

import store from './store'
import { Provider } from 'react-redux';

import CryBaby from './components/cry-baby'

ReactDOM.render(
  <Provider store={store}>
    <CryBaby />
  </Provider>, document.querySelector('#root'));