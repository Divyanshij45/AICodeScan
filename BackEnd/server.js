const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const mainApp = require('./src/app');

// Enable CORS for your frontend (Vercel)
app.use(cors({
  origin: ['http://localhost:5173', 'https://ai-code-scan.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
// Mount your actual app (assumed to be routers or middleware)
app.use(mainApp);

// Root test route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
