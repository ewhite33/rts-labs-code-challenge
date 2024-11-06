const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/AuthRoutes');
const stockRoutes = require('./routes/StockRoutes');
require('dotenv').config(); //load env variables

const app = express();
app.use(cors());

// Middleware to parse JSON req bodies
app.use(express.json());

connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/stock', stockRoutes);

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;