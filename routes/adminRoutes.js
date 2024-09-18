const express = require('express')
const adminController = require('../controllers/adminController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', adminController.createAdmin)
router.post('/login', adminController.login)
router.get(
  '/students',
  authMiddleware.verifyAdmin,
  adminController.getAllStudents
)
router.get(
  '/teachers',
  authMiddleware.verifyAdmin,
  adminController.getAllTeachers
)
router.delete(
  '/student/:studentId',
  authMiddleware.verifyAdmin,
  adminController.deleteStudent
)
router.delete(
  '/teacher/:teacherId',
  authMiddleware.verifyAdmin,
  adminController.deleteTeacher
)

module.exports = router
