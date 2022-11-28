const { appAuthService } = require('../services')
const makeAppAuthController = require('./appAuthController')

const appAuthController = makeAppAuthController(appAuthService)

module.exports = { appAuthController }