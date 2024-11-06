import React, { createContext, useState, useEffect } from 'react';

// new context for authentication
const AuthContext = createContext();

// AuthProvider provides authentication stat and functions to children
export const AuthProvider = ({ children }) => {

    // state to track if the user is logged in based on if a token exists in localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('token')));

    // login function
    const login = (token) => {
        localStorage.setItem('token', token); // stores token
        setIsLoggedIn(true); // updates state to true
    };

    // logout function
    const logout = () => {
        localStorage.removeItem('token'); // removes token
        setIsLoggedIn(false); // updates state to false
    };

    // checks token when component mounts and sets isLoggedIn based on token
    useEffect(() => {
        setIsLoggedIn(Boolean(localStorage.getItem('token')));
    }, []);

    // returns context with auth state and functions to be used in childred
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// exports for use in other components
export default AuthContext;
