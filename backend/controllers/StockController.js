// controller for grabbing data using stock external api
const axios = require('axios');

// takes in a stock smbol to get associated price
exports.getStockPrice = async (req, res) => {
    const { symbol } = req.params;
    try {
        // makes an api call to finnhub with a symbol and the API key to retrieve stock data 
        const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`);
        const openingPrice = response.data.o;
        res.json({ openingPrice }); // sends openingPrice variable with correct price in response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching stock data' });
    }
};
