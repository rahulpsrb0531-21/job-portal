import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  // Assuming the token is sent in the Authorization header
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader?.startsWith('Bearer')) return res.sendStatus(401)
  let token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(403).json({ message: 'Token is required for authentication' });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    // console.log("err", err)
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    // Store the decoded token payload in the request object
    req.decoded = decoded


    next()
  })
}

// Middleware to check if user is a recruiter
const isRecruiter = (req, res, next) => {
  // Assuming the decoded token includes a 'role' field
  const { role } = req.decoded
  // console.log(role)
  if (role !== 'RECRUITER') {
    return res.status(403).json({ message: 'Access denied! Only recruiters are allowed.' });
  }
  next()
}

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  const { role } = req.decoded;

  if (role !== 'ADMIN') {
    return res.status(403).json({ message: 'Access denied! Only admins are allowed.' });
  }

  next()
}

// Middleware to check if user is a candidate
const isCandidate = (req, res, next) => {
  const { role } = req.decoded;

  if (role !== 'CANDIDATE') {
    return res.status(403).json({ message: 'Access denied! Only candidates are allowed.' });
  }

  next()
}

export { verifyToken, isRecruiter, isAdmin, isCandidate }
