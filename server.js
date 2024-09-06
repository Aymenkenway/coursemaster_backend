const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')

// Initialize the app
const app = express()

// Load environment variables
require('dotenv').config()

// Connect to MongoDB
connectDB() // This calls the connection function

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/courses', require('./routes/courses'))
app.use('/api/students', require('./routes/students'))
app.use('/api/teachers', require('./routes/teachers'))

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
