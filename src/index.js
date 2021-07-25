import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import store from './store'

import './Styles/global.css'

import Sidebar from './Components/Sidebar'
import Routes from './routes'


ReactDOM.render(
  <Provider store={store}>
    <Sidebar />
    <Routes />
  </Provider>,
  document.getElementById('root')
);

