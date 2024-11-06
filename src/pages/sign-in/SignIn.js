import React, { useState, useContext } from 'react';
import './SignIn.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

function SignIn() {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);


    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiBaseUrl}/api/auth/signin`, { email, password });
            login(response.data.token);
            navigate('/stock-search');
        } catch (error) {
            console.error("Error signing in", error);
            alert('Invalid credentials');
        }
    };

    return (       
        <div className='form-container'>    
            <form onSubmit={handleSignIn} className='sign-in-form'>
                <h2>Sign In</h2>

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password" 
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <span>
                    <button type="submit">Sign In</button>
                </span>
                

                <p>
                    Don’t have an account? <a href="/signup">Sign up here</a>
                </p>
            </form>
        </div>             
    );
}

export default SignIn;
