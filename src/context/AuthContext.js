import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('token')));

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    useEffect(() => {
        setIsLoggedIn(Boolean(localStorage.getItem('token')));
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
