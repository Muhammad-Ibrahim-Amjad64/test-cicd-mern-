// PRODUCTS ARRAY WILL BE SEND WITH THE BODY PRODUCTS ARRAY SAMPLE NEXT IS GIVEN BELOW
const express = require('express');
const stripe = require('stripe')("sk_test_51NizxzSCV4TK3HtnWjiVLbzkmHGZCIwLos19AC8IXIKoM0xtOXuNWyhXzMg04NeljR26ou8ytRKGYwIxJNXJXbGD00sbTi8ks2"); 
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint to create a checkout session
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { amount, email, username, items } = req.body;

        if (!amount || isNaN(amount) || amount <= 0 || !email || !username) {
            return res.status(400).send({ error: 'Invalid data' });
        }

        // Create a Customer first
        const customer = await stripe.customers.create({
            email: email,
            name: username,
            metadata: {
                username: username
            }
        });

        // Create a PaymentIntent with customer details
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            customer: customer.id,
            payment_method_types: ['card'],
            description: 'Purchase from your app',
            metadata: {
                username,
                email,
                order_items: JSON.stringify(items.map(item => item.name))
            },
            shipping: {
                name: username,
                address: {
                    line1: 'Default Address', // You should collect this from user
                    city: 'Default City',
                    state: 'Default State',
                    postal_code: '12345',
                    country: 'US'
                }
            }
        });

        // Return both client secret and customer
        res.json({
            sessionId: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            customerId: customer.id
        });

    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send({ 
            error: 'Internal Server Error',
            details: error.message 
        });
    }
});

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });


// Test endpoint
app.get('/ping', (req, res) => {
    console.log('Ping endpoint hit');
    res.json({ message: 'pong', timestamp: new Date().toISOString() });
  });
app.listen(PORT, '192.168.100.116', () => {
    console.log(`Server running at http://192.168.100.116:${PORT}`);
    console.log('Available endpoints:');
    console.log(`- GET  http://192.168.100.116:${PORT}/ping`);
    console.log(`- POST http://192.168.100.116:${PORT}/create-checkout-session`);
  });


