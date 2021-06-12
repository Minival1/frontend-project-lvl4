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
import { addMessage, removeMessages } from './messagesSlice.js';
import { addChannel, removeChannel, changeChannel, renameChannel } from './channelsSlice.js';
import { closeModal } from './modalSlice.js';

if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
}

const container = document.querySelector('#chat');
const socket = io();

socket.on("newMessage", (message) => {
    store.dispatch(addMessage({ message }))
})

socket.on("newChannel", (channel) => {
    store.dispatch(addChannel({ channel }))
    store.dispatch(closeModal())
})

socket.on("removeChannel", (id) => {
    store.dispatch(removeChannel(id))
    store.dispatch(removeMessages(id))
    store.dispatch(closeModal())
    store.dispatch(changeChannel(1))
})

socket.on("renameChannel", ({ id, name }) => {
    store.dispatch(renameChannel({id, name}))
    store.dispatch(closeModal())
})

ReactDom.render(
    <Provider store={store}>
        <SocketProvider.Provider value={socket}>
            <App/>
        </SocketProvider.Provider>
    </Provider>,
    container,
);
