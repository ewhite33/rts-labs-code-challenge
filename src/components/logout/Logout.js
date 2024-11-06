import React, { useContext } from 'react';
import './Logout.css'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function Logout() {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/signin');
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default Logout;
