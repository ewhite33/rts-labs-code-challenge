// Middleware for JWT token auth
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Grab token from Auth header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // if no token return error
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    // Verify token using the JWT secret in env variables
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden' }); // for invalid token
        req.user = user; // user info for the request
        next();
    });
};

module.exports = authenticateToken;
