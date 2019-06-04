const Promise = require('bluebird')
const jwt = Promise.promisifyAll(require('jsonwebtoken'))
exports.verify = async (data, secret) => jwt.verifyAsync(data, secret)
exports.sign = async (data, secret, opts) => jwt.signAsync(data, secret, opts)
