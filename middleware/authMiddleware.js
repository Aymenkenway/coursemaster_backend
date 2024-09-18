const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodedToken
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

exports.verifyStudent = (req, res, next) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ error: 'Forbidden' })
  }
  next()
}

exports.verifyTeacher = (req, res, next) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ error: 'Forbidden' })
  }
  next()
}

exports.verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' })
  }
  next()
}
