const JWT = require('../utils/jwt')
const Password = require('../../../helpers/password')
const { userList } = require('../../../users/gateways')
const { appUserList } = require('../../../mobile-application/appUserModifications/gateways')

const buildMakeAuthService = require('./authService')
const makeAuthService = buildMakeAuthService({ Password, JWT })
const authService = makeAuthService(userList)

const buildMakeAppAuthService = require('./appAuthService')
const makeAppAuthService = buildMakeAppAuthService({ Password, JWT })
const appAuthService = makeAppAuthService(appUserList)


module.exports = { authService, appAuthService }