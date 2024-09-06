const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  duration: String,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})
module.exports = mongoose.model('Course', courseSchema)
