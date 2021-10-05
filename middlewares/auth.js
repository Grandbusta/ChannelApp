const jwt = require('jsonwebtoken')
const { JWT_KEY } = process.env
const db = require('../db/models')


exports.userAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, JWT_KEY)
      const userData = await db.User.findOne({
        where: { email: decoded.email },
        attributes: ['id', 'email', 'username'],
      })
      if (userData.email) {
        req.userData = userData
        next()
      } else {
        return res.status(401).json({
          message: 'Auth failed',
        })
      }
    } else {
      res.status(422).json({ message: 'token not present in header' })
    }
  } catch (error) {
    console.error(error)
    return res.status(401).json({
      message: 'Auth failed',
    })
  }
}
