const express = require('express');
const aiRoutes = require('./routes/ai.routes');

const app = express();

app.use(express.json());

// Remove cors from here to avoid duplication — handled in server.js

app.use('/ai', aiRoutes);

app.get('/', (req, res) => {
  res.send('Hello World from app.js');
});

module.exports = app;
