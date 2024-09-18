const express = require('express')
const courseController = require('../controllers/courseController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', authMiddleware.verifyTeacher, courseController.createCourse)
router.get('/', courseController.getAllCourses)
router.get('/:courseId', courseController.getCourseById)
router.put(
  '/:courseId',
  authMiddleware.verifyTeacher,
  courseController.updateCourse
)
router.delete(
  '/:courseId',
  authMiddleware.verifyTeacher,
  courseController.deleteCourse
)

module.exports = router
