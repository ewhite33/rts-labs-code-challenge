import React, { useState } from 'react';
import './StockSearchForm.css';
import axios from 'axios';

function StockSearchForm() {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const [symbol, setSymbol] = useState('');
    const [openingPrice, setOpeningPrice] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${apiBaseUrl}/api/stock/${symbol}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOpeningPrice(response.data.openingPrice);
            setError('');
        } catch (error) {
            setError('Error fetching stock data or unauthorized access');
        }
    };

    return (
        <div className="form-container">
            <div className="search-form">
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
