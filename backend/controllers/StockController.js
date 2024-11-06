const axios = require('axios');

exports.getStockPrice = async (req, res) => {
    const { symbol } = req.params;
    try {
        const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`);
        const openingPrice = response.data.o;
        res.json({ openingPrice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching stock data' });
    }
};
