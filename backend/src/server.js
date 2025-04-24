// Required External Modules
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require("express-session");
const passport = require("passport");


// Import Routes
const cafeRoutes = require( './routes/cafe-router.js');
const authRoutes = require('./routes/auth-router.js');
const userRoutes = require('./routes/user-router.js');
const notebookRoutes = require('./routes/notebook-router.js');

// Import Passport configuration
require('./config/passport.config');  // <-- This line is the change!

// App Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))


app.use(express.json());  // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies

//Middleware - AUTH
//enable whole app to handle login sessions, let passport store user info betwen requests
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure:false, //set to true if using HTTPS
    httpOnly: true,
    maxAge: 1000*60*60*24 //1 day
  }
}))

//Middleware - PASSPORT intialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/cafes', cafeRoutes);  // Mount cafe routes
app.use('/api/auth', authRoutes); //Mount authentication routes
app.use('/api/user',userRoutes);//mount user routes 
app.use('/api/notebook',notebookRoutes); //mounting notebook routes 
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

// Server Activation
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// For testing with supertest
module.exports = app;