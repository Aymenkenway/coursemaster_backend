const express = require('express')
const studentController = require('../controllers/studentController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', studentController.createStudent)
router.get(
  '/',
  authMiddleware.verifyStudent,
  studentController.getEnrolledCourses
)
router.post(
  '/:courseId/enroll',
  authMiddleware.verifyStudent,
  studentController.enrollInCourse
)
router.delete(
  '/:courseId/unenroll',
  authMiddleware.verifyStudent,
  studentController.unenrollFromCourse
)

module.exports = router
