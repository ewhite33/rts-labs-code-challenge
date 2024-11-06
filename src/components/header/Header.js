import React, { useContext } from 'react';
import './Header.css';
import Logout from '../logout/Logout';
import AuthContext from '../../context/AuthContext';

function Header() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <header>
            <h1>RTS Labs Code Challenge</h1>
            {isLoggedIn && <Logout />}
        </header>
    );
}

export default Header;
