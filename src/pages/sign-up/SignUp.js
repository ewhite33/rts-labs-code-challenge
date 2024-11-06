import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiBaseUrl}/api/auth/signup`, { email, password });
            alert('Account created successfully!');
            navigate('/signin');
        } catch (error) {
            console.error("Error signing up", error);
            alert('Failed to create account');
        }
    };

    return (    
        <div className='form-container'>       
            <form onSubmit={handleSignUp} className='sign-up-form'>
                <h2>Sign Up</h2>

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
                    <button type="submit">Sign Up</button>
                </span>
            </form>
        </div> 
    );
}

export default SignUp;
