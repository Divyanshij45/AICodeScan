const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');

const app = express();

// ✅ Enable CORS for both local + Vercel
app.use(cors({
  origin: ['http://localhost:5173', 'https://ai-code-scan.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ Parse JSON
app.use(express.json());

// ✅ Your Routes
app.use('/ai', aiRoutes);

// Optional root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = app;
