const express = require('express')
const router = express.Router()
const {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} = require('../controllers/teacherController')

router.get('/', getAllTeachers)
router.post('/', createTeacher)
router.get('/:id', getTeacherById)
router.put('/:id', updateTeacher)
router.delete('/:id', deleteTeacher)

module.exports = router
