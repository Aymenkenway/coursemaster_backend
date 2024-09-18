const Admin = require('../models/admin')
const Student = require('../models/student')
const Teacher = require('../models/teacher')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body // Extract email and password

    // Hash the password using bcrypt
    const saltRounds = 10 // Adjust the salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const admin = new Admin({ name, email, password: hashedPassword }) // Use hashed password
    await admin.save()

    res.status(201).json({ message: 'Admin created successfully' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log(email, password)
    const admin = await Admin.findOne({ email })
    console.log(!admin)
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password)
    console.log(password, admin.password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalidy credentials' })
    }

    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
    res.json({ token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// authMiddleware.js
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodedToken
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
    res.json(students)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find()
    res.json(teachers)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId)
    res.status(200).json({ message: 'Student deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.deleteTeacher = async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.teacherId)
    res.status(200).json({ message: 'Teacher deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
