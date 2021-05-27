import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
}

const container = document.querySelector('#chat');

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    container,
);
