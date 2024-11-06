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

            const fetchedOpeningPrice = response.data.openingPrice;

            // Check if the price is null or 0
            if (fetchedOpeningPrice === null || fetchedOpeningPrice === 0) {
                setOpeningPrice(null); // Clears any previously displayed price
                setError('Stock symbol not found. Try another symbol'); // Set error message leting the user know that it was an unvalid stock symbol
            } else {
                //  When price is valid, update state and clear any previous error
                setOpeningPrice(fetchedOpeningPrice);
                setError(''); // Clear any existing error message
            }
        } catch (error) {
            setError('Error fetching stock data or unauthorized access');
        }
    };

    return (
        // Stock Search form
        <div className="form-container">
            <div className="form">
                <h2>Stock Search</h2>

                <label htmlFor="search">Stock Symbol Search</label>
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="Ex: NFLX"
                />
                <span>
                    <button onClick={handleSearch}>Search</button>
                </span>
            
                {openingPrice !== null && <p>Opening Price: ${openingPrice}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </div>
    );
}

export default StockSearchForm;
