const { authService, appAuthService } = require('../services')
const makeAuthController = require('./authController')
const makeAppAuthController = require('./appAuthController')

const authAuthController = makeAuthController(authService)
const appAuthController = makeAppAuthController(appAuthService)

module.exports = { authAuthController, appAuthController }