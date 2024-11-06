import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
    // base url for the api from env variables
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // state variables for tracking values of inputs in the form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // hook to navigate routes
    const navigate = useNavigate();

    // SignUp function
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiBaseUrl}/api/auth/signup`, { email, password }); // post request to the signup endpoint with email and pass.
            alert('Account created successfully!');
            navigate('/signin'); // redirects the user to signin page after successful signup
        } catch (error) {
            console.error("Error signing up", error);
            alert('Failed to create account');
        }
    };

    return (  
        // Sign Up form
        <div className='form-container'>       
            <form onSubmit={handleSignUp} className='form'>
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
