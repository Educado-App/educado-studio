const { authService } = require('../services')
const makeAuthController = require('./authController')

const authAuthController = makeAuthController(authService)

module.exports = { authAuthController }