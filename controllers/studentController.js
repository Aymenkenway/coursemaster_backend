const User = require('../models/User')

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
    res.json(students)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get a specific student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await User.findById(req.params.id)
    if (!student || student.role !== 'student') {
      return res.status(404).json({ message: 'Student not found' })
    }
    res.json(student)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Add a new student
exports.createStudent = async (req, res) => {
  try {
    const newStudent = new User({ ...req.body, role: 'student' })
    await newStudent.save()
    res.status(201).json(newStudent)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Update student details
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedStudent || updatedStudent.role !== 'student') {
      return res.status(404).json({ message: 'Student not found' })
    }
    res.json(updatedStudent)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const student = await User.findByIdAndDelete(req.params.id)
    if (!student || student.role !== 'student') {
      return res.status(404).json({ message: 'Student not found' })
    }
    res.json({ message: 'Student deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
