const JWT = require('../utils/jwt')
const Password = require('../../../helpers/password')
const Params = require('../../../helpers/validation/params')

const { authService } = require('../services')

const makeAuthController = require('./authController')
const makePasswordManagerController = require('./passwordManagerController')

const authController = makeAuthController({ authService, JWT })
const passwordManagerController = makePasswordManagerController({ authService, Password, Params })

module.exports = { authController, passwordManagerController }