process.env.NODE_ENV = 'test';

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const User = require('../models/Users');

// connect to mongoDB
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// after each test delete users to keep db clean
afterEach(async () => {
    await User.deleteMany({});
});

// close connection after tests
afterAll(async () => {
    await mongoose.connection.close();
});

describe('Auth and Stock API Tests', () => {
    let token; // stores token for test

    // test for new user sign up 
    it('should sign up a new user', async () => {
        const response = await request(app)
            .post('/api/auth/signup') // POST request to signup endpoint
            .send({ email: 'test@example.com', password: 'password123' }); // test data

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User created successfully');
    });

    // test for logging in an existig user
    it('should log in an existing user', async () => {
        // Signs up user to ensure the user exists
        await request(app)
            .post('/api/auth/signup')
            .send({ email: 'test@example.com', password: 'password123' });

        // Sign in with new user creds
        const response = await request(app)
            .post('/api/auth/signin')
            .send({ email: 'test@example.com', password: 'password123' });

        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
        
        token = response.body.token;
    });

    // test for getting stock price for an authenticated user
    it('should fetch stock price for an authenticated user', async () => {
        const stockSymbol = 'NFLX'; // test symbol (Netflix)

        // send GET request to the stock endpoint with auth header
        const response = await request(app)
            .get(`/api/stock/${stockSymbol}`)
            .set('Authorization', `Bearer ${token}`); // attached JWT token

        expect(response.statusCode).toBe(200);
        expect(response.body.openingPrice).toBeDefined();
    });
});
