// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import React from 'react'
import ReactDom from "react-dom";
import App from './App';

if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
}

const container = document.querySelector("#chat");

ReactDom.render(
    <App/>,
    container
)

console.log('it works!');