const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const courseRoutes = require('./routes/courseRoutes')
const studentRoutes = require('./routes/studentRoutes')
const teacherRoutes = require('./routes/teacherRoutes')
const adminRoutes = require('./routes/adminRoutes')
const errorMiddleware = require('./middleware/errorMiddleware')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/courses', courseRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/teachers', teacherRoutes)
app.use('/api/admin', adminRoutes)

// Error handling
app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
