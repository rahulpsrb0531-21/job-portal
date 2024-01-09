import jwt from 'jsonwebtoken'
const generateToken = role => {
  return jwt.sign({ role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30d', // 30 days
  })
}

export default generateToken