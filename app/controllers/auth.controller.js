const  User = require('../../models/user');
const config = require('../config/config')
const jwt = require('../helpers/jwt')

const { BadRequestError } = require('../helpers/httpError')

exports.register = async (req, res, next) => {
    const { email, password, name } = req.body
    const response = await User.create({  name,  email, password })
    const userJSON = response.toJSON()
    delete userJSON.password
    const token = await jwt.sign(userJSON, config.secret, {
        expiresIn: '1 h'
    })
    res.status(200).json({
        message: 'success',
        data: userJSON,
        token: 'JWT ' + token,
    })
}

exports.login = async (req, res, next) => {
    const user = await User.findOne({
        email: req.body.email
      })
      if (!user) {
        throw new BadRequestError('Invalid Login or password.')
      }
      const isMatch = await user.comparePassword(req.body.password)
      if (!isMatch) {
        throw new BadRequestError('Invalid Login or password.')
      }
      const userJSON = user.toJSON()
      delete userJSON.password
      const token = await jwt.sign(userJSON, config.secret, {
        expiresIn: 10080
      })
      const userData = {
        _id: userJSON._id,
        name: userJSON.name,
        email: userJSON.email,
        token: 'JWT ' + token,
        created_at: userJSON.created_at
      }
      res.status(200).json({ success: 'success', data: userData })
}

exports.forgotPassword = async (req, res, next) => {

    res.status(200).json({
        message: 'success'
    })
}

exports.resetPassword = async (req, res, next) => {
    const { password } = req.body
  
    res.status(200).json({
        status: 200,
        message: 'Your password has been reset successfully.'
    })
}


