const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes');
const app = express();

// ✅ Allow only your Vercel frontend domain
app.use(cors({
  origin: 'https://ai-code-scan-74zu9aszc-deepdiksha59-5703s-projects.vercel.app',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/ai', aiRoutes);

module.exports = app;
