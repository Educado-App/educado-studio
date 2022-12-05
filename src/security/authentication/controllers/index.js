const { authService } = require('../services')
const makeAuthController = require('./authController')
const JWT = require('../utils/jwt')

const authController = makeAuthController({ authService, JWT })

module.exports = { authController }