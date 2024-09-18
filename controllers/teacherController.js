const Teacher = require('../models/teacher')
const Course = require('../models/Course')

exports.createTeacher = async (req, res) => {
  try {
    const teacher = new Teacher(req.body)
    await teacher.save()
    res.status(201).json({ message: 'Teacher created successfully' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.getMyCourses = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user._id).populate(
      'createdCourses'
    )
    res.json(teacher.createdCourses)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getStudentsEnrolledInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate(
      'students'
    )
    res.json(course.students)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
