const express = require('express')
const router = express.Router()
const {
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController')

router.get('/', getAllCourses)
router.post('/', createCourse)
router.get('/:id', getCourseById)
router.put('/:id', updateCourse)
router.delete('/:id', deleteCourse)

module.exports = router
