require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db');

const app = express();

connectDB();

// Importing Routes
const authRoutes = require('./routes/auth.routes');
const chatRoutes = require('./routes/chat.routes');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Using Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);


module.exports = app;