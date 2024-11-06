import React, { useContext } from 'react';
import Logout from '../logout/Logout';
import AuthContext from '../../context/AuthContext';

function Header() {

    // get isLoggedIn status from AuthContext to render logout button
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <header>
            <h1>RTS Labs Code Challenge</h1>

            {/* Checks isLoggedIn to only show the logout button in the header if the user is in fact logged in */}
            {isLoggedIn && <Logout />}
        </header>
    );
}

export default Header;
