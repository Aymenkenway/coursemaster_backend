const User = require('../models/User')

// Get all teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' })
    res.json(teachers)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get a teacher by ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await User.findById(req.params.id)
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(404).json({ message: 'Teacher not found' })
    }
    res.json(teacher)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Add a new teacher
exports.createTeacher = async (req, res) => {
  try {
    const newTeacher = new User({ ...req.body, role: 'teacher' })
    await newTeacher.save()
    res.status(201).json(newTeacher)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Update a teacher by ID
exports.updateTeacher = async (req, res) => {
  try {
    const updatedTeacher = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updatedTeacher)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Delete a teacher by ID
exports.deleteTeacher = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'Teacher deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
