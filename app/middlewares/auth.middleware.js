const { BadRequestError, UnauthorizedError } = require('../helpers/httpError')
const Promise = require('bluebird')
const jwt = require('jsonwebtoken')
const jwtPromise = Promise.promisifyAll(jwt)
const config = require('../config/config');
const User = require('../../models/user')
exports.registerMiddleware = async (req, res, next) => {
    let message
    const { name, email, password } = req.body
    if (!name) {
        message = 'The name field is required.'
    }else if (!email) {
        message = 'The email field is required.'
    }else if (!password) {
        message = 'The password field is required.'
    }else if (password.length <= 7) {
        message = 'Passwords must be at least 8 characters.'
    }
    const user = await User.findOne({ email: email })
    if (user) {
        message = 'Email is already taken.'
    }
    if (message) throw new BadRequestError(message)
    next()
}

exports.loginMddileware = async (req, res, next) => {
    let message
    const { email, password } = req.body
    if (!email) {
        message = 'The email field is required.'
    } else if (!password) {
        message = 'The password field is required.'
    }
    if (message) throw new BadRequestError(message)
    next()
}
exports.forgotPasswordMddileware = async (req, res, next) => {
    let message
    const { email } = req.body
    if (email) {
        const user = await users.findOne({ where: { email } })
        if (!user) {
            throw new BadRequestError('No account found with that email address.')
        }
    }else {
        message = 'The email field is required.'
    }
    if (message) throw new BadRequestError(message)
    next()
}
exports.isAuthenticated = async (req, res, next) => {
    const authorization = req.headers['authorization'] 
    if (!authorization) {
        throw new BadRequestError('Missing authorization header')
    }
    const [type, token] = authorization.split(/ /g) 
    if (type !== 'JWT') throw new BadRequestError('Only JWT type allowed!')
    if (!token) throw new BadRequestError('Token missing!')
    const jwtResult = await jwtPromise.verifyAsync(token, config.secret).catch(() => 
        next(new UnauthorizedError('Invalid token!')))
    if (!jwtResult) {
        throw new BadRequestError('Invalid token!')
    } else {
        const authorizedUser = await users.findOne({ where: { email: jwtResult.email }})
        const userJSON = authorizedUser.toJSON()
        delete userJSON.password
        req.currentUser = userJSON
    }
    next()
}
