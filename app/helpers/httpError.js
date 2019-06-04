class BadRequestError extends Error {
    constructor(message) {
        super()
        this.message = message
        this.status = 400
    }
}
class UnauthorizedError extends Error {
    constructor(message) {
        super()
        this.message = message
        this.status = 401
    }
}
module.exports = { BadRequestError, UnauthorizedError }
