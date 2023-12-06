const express = require('express');

// Create an Express application instance
const app = express();

// Route definitions and other application logic go here

// Start the Express application
const {sendOTP, verifyOTP} = require('../controllers/twilio-sms');

const router = express.Router();


app.post('/send-otp', sendOTP);

app.post('/verify-otp', verifyOTP);

module.exports = router;