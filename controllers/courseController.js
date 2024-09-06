const Course = require('../models/Course')

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('teacher')
    res.json(courses)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body)
    await newCourse.save()
    res.status(201).json(newCourse)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get a course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('teacher')
    if (!course) return res.status(404).json({ message: 'Course not found' })
    res.json(course)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Update a course by ID
exports.updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updatedCourse)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Delete a course by ID
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id)
    res.json({ message: 'Course deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
