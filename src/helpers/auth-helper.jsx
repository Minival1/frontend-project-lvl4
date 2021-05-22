import React, { createContext, useState, useContext } from "react";

const nameKey = "token";

const authContext = createContext();

export const useAuth = () => useContext(authContext);

const authHelper = () => {
    const savedToken = localStorage.getItem(nameKey);

    const [token, setToken] = useState(savedToken);

    const signIn = (newToken) => {
        localStorage.setItem(nameKey, newToken);
        setToken(newToken);
    }

    const signOut = () => {
        localStorage.removeItem(nameKey);
        setToken(null);
    }

    return {
        token,
        signIn,
        signOut
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