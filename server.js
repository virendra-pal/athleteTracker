// server.js
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/athletes', require('./routes/athletes'));
app.use('/api/matches', require('./routes/matches'));
app.use('/api/performances', require('./routes/performances'));
app.use('/api/analytics', require('./routes/analytics'));

// simple error handler
app.use((err, req, res, next) => {
  console.error(err.stack || err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

app.get('/', (req, res) => {
  res.send('Athlete Tracker API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));