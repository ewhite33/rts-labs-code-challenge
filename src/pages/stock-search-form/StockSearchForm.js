import React, { useState } from 'react';
import axios from 'axios';

function StockSearchForm() {

    // base url for the api from env variables
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // state variables for tracking values of the input in the form, the price returned, and error messages if any occur
    const [symbol, setSymbol] = useState('');
    const [openingPrice, setOpeningPrice] = useState(null);
    const [error, setError] = useState('');

    // Stock search function
    const handleSearch = async () => {

        // grabs the token to include in the request
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${apiBaseUrl}/api/stock/${symbol}`, { // Send get request to the endpoint with a symbol and token
                headers: { Authorization: `Bearer ${token}` } // Attach token for authorization
            });
            setOpeningPrice(response.data.openingPrice); // set price from response
            setError('');
        } catch (error) {
            setError('Error fetching stock data or unauthorized access');
        }
    };

    return (
        // Stock Search form
        <div className="form-container">
            <div className="form">
                <h2>Stock Search</h2>

                <label htmlFor="search">Search</label>
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="Enter stock symbol"
                />
                <span>
                    <button onClick={handleSearch}>Search</button>
                </span>
            
                {openingPrice && <p>Opening Price: ${openingPrice}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </div>
    );
}

export default StockSearchForm;
