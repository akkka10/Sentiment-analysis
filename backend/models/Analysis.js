// models/Analysis.js
const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    sentiment: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    analyzedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Analysis', AnalysisSchema);