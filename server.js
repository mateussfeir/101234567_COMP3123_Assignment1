const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Import route files
const userRoutes = require('./routes/user');
const empRoutes = require('./routes/employee');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // allows JSON in request body

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', empRoutes);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

