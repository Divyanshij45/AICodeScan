const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const mainApp = require('./src/app');

const allowedOrigins = [
  'http://localhost:5173',
  'https://ai-code-scan.vercel.app',
  'https://ai-code-scan-74zu9aszc-deepdiksha59-5703s-projects.vercel.app'
];

// ✅ Proper CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());
app.use(mainApp);

// Test route
app.get('/', (req, res) => {
  res.send('Hello World from server.js');
});

// Start the server
app.listen(3000, () => {
  console.log('✅ Server is running on http://localhost:3000');
});
