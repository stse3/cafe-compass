// Required External Modules
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');  // for logging

// Import Routes
const cafeRoutes = require('./routes/cafeRouter.js');
const userRoutes = require('./routes/userRouter.js');  // when you add user functionality

// App Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));  // Log requests in development
}

// Routes
app.use('/api/cafes', cafeRoutes);  // Mount cafe routes
// app.use('/api/users', userRoutes);  // Will add later

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Cafe Compass API' });
});

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Internal server error', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});
const testConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database connection successful:', result.rows[0]);
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

testConnection();
// Server Activation
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// For testing with supertest
module.exports = app;