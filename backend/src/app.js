require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db');
const authRoutes = require('./routes/auth.routes');

const app = express();

connectDB();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);


module.exports = app;