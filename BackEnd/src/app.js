const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes');
const app = express();

// Correct CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173', // Your local development
    'https://ai-code-scan.vercel.app' // Your production frontend
  ],
  methods: ['POST'],
  credentials: true
}));

// Rest of your existing code remains exactly the same
app.use(express.json());
app.use('/ai', aiRoutes);

module.exports = app;