const express = require('express')
const router = express.Router()
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController')

// Routes for students
router.get('/', getAllStudents) // Get all students
router.post('/', createStudent) // Add a new student
router.get('/:id', getStudentById) // Get a student by ID
router.put('/:id', updateStudent) // Update student details
router.delete('/:id', deleteStudent) // Delete a student

module.exports = router
