import React, { createContext, useState, useContext } from "react";
import store from "../store";
import { signInState, signOutState } from '../loginSlice';

const nameKeyToken = "token";
const nameKeyUsername = "username";

const authContext = createContext();

export const useAuth = () => useContext(authContext);

const authHelper = () => {
    const savedToken = localStorage.getItem(nameKeyToken);
    const savedUsername = localStorage.getItem(nameKeyUsername);

    const [token, setToken] = useState(savedToken);
    const [username, setUsername] = useState(savedUsername);

    const signIn = (newToken, newUsername) => {
        localStorage.setItem(nameKeyToken, newToken);
        localStorage.setItem(nameKeyUsername, newUsername);

        setToken(newToken);
        setUsername(newUsername);

        store.dispatch(signInState());
    }

    const signOut = () => {
        localStorage.removeItem(nameKeyToken);
        localStorage.removeItem(nameKeyUsername);

        setToken(null);
        setUsername(null);

        store.dispatch(signOutState());
    }

    return {
        token,
        username,
        signIn,
        signOut,
    }
}

export const ProvideAuth = ({ children }) => {
    const auth = authHelper();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}
