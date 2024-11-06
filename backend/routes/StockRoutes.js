// Routes for stock data endpoint
const express = require('express');
const { getStockPrice } = require('../controllers/StockController');
const authenticateToken = require('../middleware/AuthMiddleware');
const router = express.Router();

router.get('/:symbol', authenticateToken, getStockPrice);

module.exports = router;
