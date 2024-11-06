import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function Logout() {
    const navigate = useNavigate();

    // logout function from AuthContext to logout the user
    const { logout } = useContext(AuthContext);

    // Logout function
    const handleLogout = () => {
        logout(); // calls logout function from AuthCOntext to clear user session
        navigate('/signin'); // redirects to sign in page
    };

    return (
        // button that handles logout on click
        <button onClick={handleLogout}>Logout</button>
    );
}

export default Logout;
