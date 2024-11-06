import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

function SignIn() {
    // base url for the api from env variables
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // state variables for tracking values of inputs in the form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // hook to navigate routes
    const navigate = useNavigate();

    // grabs login function from AuthContext to update auth state
    const { login } = useContext(AuthContext);

    // SignIn function
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiBaseUrl}/api/auth/signin`, { email, password }); // post request to the signin endpoint with email and pass
            login(response.data.token); // calls login function from AuthContext with token recieved from backend
            navigate('/stock-search'); // redirects the user to the stock search page after successful login
        } catch (error) {
            console.error("Error signing in", error);
            alert('Invalid credentials');
        }
    };

    return (   
        // Sign In form    
        <div className='form-container'>    
            <form onSubmit={handleSignIn} className='form'>
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
