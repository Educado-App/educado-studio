const { authService } = require('../services')
const makeAuthController = require('./authController')

const authController = makeAuthController(authService)

module.exports = { authController }