const express = require('express')
const teacherController = require('../controllers/teacherController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', teacherController.createTeacher)
router.get(
  '/my-courses',
  authMiddleware.verifyTeacher,
  teacherController.getMyCourses
)
router.get(
  '/students/:courseId',
  authMiddleware.verifyTeacher,
  teacherController.getStudentsEnrolledInCourse
)

module.exports = router
