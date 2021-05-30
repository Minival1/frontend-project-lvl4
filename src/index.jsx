import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import SocketProvider from "./helpers/socketContext";
import { io } from "socket.io-client";
import App from './App';
import { addMessage } from './messagesSlice.js';

if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
}

const container = document.querySelector('#chat');
const socket = io();

socket.on("newMessage", (message) => {
    store.dispatch(addMessage({ message }))
})

ReactDom.render(
    <Provider store={store}>
        <SocketProvider.Provider value={socket}>
            <App/>
        </SocketProvider.Provider>
    </Provider>,
    container,
);
