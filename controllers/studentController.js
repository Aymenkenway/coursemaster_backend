const Student = require('../models/student')
const Course = require('../models/Course')

exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body)
    await student.save()
    res.status(201).json({ message: 'Student created successfully' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.getEnrolledCourses = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).populate(
      'enrolledCourses'
    )
    res.json(student.enrolledCourses)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.enrollInCourse = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id)
    const course = await Course.findById(req.params.courseId)

    if (!student || !course) {
      return res.status(404).json({ error: 'Student or course not found' })
    }

    student.enrolledCourses.push(course._id)
    course.students.push(student._id)

    await student.save()
    await course.save()

    res.status(200).json({ message: 'Enrolled in course successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.unenrollFromCourse = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id)
    const course = await Course.findById(req.params.courseId)

    if (!student || !course) {
      return res.status(404).json({ error: 'Student or course not found' })
    }

    student.enrolledCourses = student.enrolledCourses.filter(
      (courseId) => courseId !== course._id
    )
    course.students = course.students.filter(
      (studentId) => studentId !== student._id
    )

    await student.save()
    await course.save()

    res.status(200).json({ message: 'Unenrolled from course successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
