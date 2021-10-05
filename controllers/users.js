const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const {JWT_KEY} = process.env
const db = require('../db/models')

exports.login = async (req, res, next) => {
  try {
    const {email, password} = req.body
    if (email && password) {
        let check = await db.User.findOne({
          where: {email: email},
          attributes: ['email', 'password'],
        })
        if (check !== null) {
          let comparePassword = await bcrypt.compare(password, check.password)
          if (comparePassword) {
            res.status(200).json({
              response: 'Auth successful',
              token: jwt.sign({email: check.email}, JWT_KEY),
            })
          } else {
            res.status(401).json({response: 'Auth failed'})
          }
        } else {
          res.status(404).json({response: 'Not found'})
        }
    } else {
      res.status(422).json({response: 'one or more values are missing'})
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({response: 'An error occured'})
  }
}
