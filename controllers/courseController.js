const Course = require('../models/Course')

exports.createCourse = async (req, res) => {
  try {
    const course = new Course({
      ...req.body,
      teacher: req.user._id,
    })
    await course.save()

    const teacher = await Teacher.findById(req.user._id)
    teacher.createdCourses.push(course._id)
    await teacher.save()

    res.status(201).json({ message: 'Course created successfully' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
    res.json(courses)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId)
    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }
    res.json(course)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      req.body,
      { new: true }
    )
    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }
    res.json(course)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.courseId)
    res.status(200).json({ message: 'Course deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
