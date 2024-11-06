process.env.NODE_ENV = 'test';

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index'); // Ensure this points to your Express app
const User = require('../models/Users');

// Set up before each test (connect to the database)
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// Clean up after each test
afterEach(async () => {
    await User.deleteMany({});
});

// Close database connection after all tests
afterAll(async () => {
    await mongoose.connection.close();
});

describe('Auth and Stock API Tests', () => {
    let token;

    it('should sign up a new user', async () => {
        const response = await request(app)
            .post('/api/auth/signup')
            .send({ email: 'test@example.com', password: 'password123' });

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User created successfully');
    });

    it('should log in an existing user', async () => {
        // First, create a user to log in
        await request(app)
            .post('/api/auth/signup')
            .send({ email: 'test@example.com', password: 'password123' });

        const response = await request(app)
            .post('/api/auth/signin')
            .send({ email: 'test@example.com', password: 'password123' });

        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
        
        // Save token for the next test
        token = response.body.token;
    });

    it('should fetch stock price for an authenticated user', async () => {
        // Assuming a stock symbol endpoint is available
        const stockSymbol = 'AAPL';

        // Ensure user is logged in and has a valid token
        const response = await request(app)
            .get(`/api/stock/${stockSymbol}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.openingPrice).toBeDefined(); // Check for the price in response
    });
});
