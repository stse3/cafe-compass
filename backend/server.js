
const express= require('express');
const cors = require('cors');


//intialize the express app
const app = express();

//import routes - importing, use
const cafeRoutes = require('./routes/cafe-routes');
const userRoutes = require('./routes/user-routes');


//use routes
app.use('api/cafes',cafeRoutes);
app.use('api/users',userRoutes);

// Middleware
app.use(cors({ origin: server.corsOrigin }));
app.use(express.json());

//errror handling middleware
const errorHandler= require("./middleware/error-handler");
app.use(errorHandler);

const PORT = server.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${server.NODE_ENV} mode`);
});

