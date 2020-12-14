const functions = require('firebase-functions');

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51Ht40aENgl6Ii0zjfbS9Z1kP0nklcHYFUGGyk5voVwgaBl9IHxrVhFHjyRQJB9hFbsKarOBm4axrMEVySIoQKikO00WBUfQmxS');

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// - Api routes
app.get('/', (req, res) => res.status(200).send('ok!!'));

app.post('/payments/create', async(req, res) => {
    const total = req.query.total;

    console.log('Payment Req Received >>>', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });

})

// - Listen command
exports.api = functions.https.onRequest(app);