// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route, Switch, NavLink, Redirect } from "react-router-dom";

// components
import Login from "./components/Login";
import E404 from "./components/E404";
import Navbar from "./components/Navbar";

if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
}

const container = document.querySelector("#chat");

ReactDom.render(
    <div className="d-flex flex-column h-100">
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <h1>Main Page</h1>
                    <NavLink to="/login">Login Page</NavLink>
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="*">
                    <E404 />
                </Route>
            </Switch>
        </BrowserRouter>
    </div>,
    container
)

console.log('it works!');