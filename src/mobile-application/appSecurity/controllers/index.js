/**
  * index for login controller for an app user
  * Injects needed appAuthService
  * 
  * Last Modified: 28-11-2022
  **/

const { appAuthService } = require('../services')
const makeAppAuthController = require('./appAuthController')

const appAuthController = makeAppAuthController(appAuthService)

module.exports = { appAuthController }