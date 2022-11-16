const { authService, appAuthService } = require('../services')
const makeAuthController = require('./authController')

const authAuthController = makeAuthController(authService)
const appAuthController = makeAuthController(appAuthService)

module.exports = { authAuthController, appAuthController }