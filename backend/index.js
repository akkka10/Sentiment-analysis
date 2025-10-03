// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const Analysis = require('./models/Analysis');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors()); // Allow requests from your frontend
app.use(express.json()); // Allow server to accept JSON data

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- API Routes ---
// This is the correct code
app.post('/api/analyze', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Text is required.' });
        }

        // 1. Forward the text to the Flask API
        const flaskResponse = await axios.post(process.env.FLASK_API_URL, { text });

        // Destructure 'sentiment' and 'confidence' from the response
        const { sentiment, confidence } = flaskResponse.data;

        // 2. Store the result in MongoDB using the correct variable
        const newAnalysis = new Analysis({
            text,
            sentiment,
            score: confidence, // Use the 'confidence' variable here
        });
        await newAnalysis.save();
        console.log('Analysis saved to database.');

        // 3. Forward the result back to the frontend
        res.status(200).json({
            sentiment,
            score: confidence // Also use 'confidence' here
        });

    } catch (error) {
        // This will catch Mongoose validation errors or other issues
        console.error('Error during analysis:', error.message);
        res.status(500).json({ message: 'An error occurred on the server.' });
    }
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Node.js server running on http://localhost:${PORT}`);
});