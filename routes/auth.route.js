const express = require('express')
const {
    register,
    login,
    forgotPassword,
    resetPassword
} = require('../app/controllers/auth.controller');

const { isAuthenticated, 
    registerMiddleware, 
    loginMddileware, 
    forgotPasswordMddileware, 
    resetPasswordMddileware } = require('../app/middlewares/auth.middleware')
const { asyncWrap } = require('../app/helpers/asyncWrapper')
const router = express.Router()

router.post('/register', asyncWrap(registerMiddleware), asyncWrap(register))

router.post('/login', asyncWrap(loginMddileware), asyncWrap(login))
router.post('/forgot-password', asyncWrap(forgotPasswordMddileware), asyncWrap(forgotPassword))
router.post('/reset-password', asyncWrap(resetPasswordMddileware), asyncWrap(isAuthenticated), asyncWrap(resetPassword))


module.exports = router
