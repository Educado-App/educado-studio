const JWT = require('../../../security/authentication/utils/jwt')
const Password = require('../../../helpers/password')
const { appUserList } = require('../../appUserModifications/gateways')


const buildMakeAppAuthService = require('../../appSecurity/services/appAuthService')
const makeAppAuthService = buildMakeAppAuthService({ Password, JWT })
const appAuthService = makeAppAuthService(appUserList)


module.exports = { appAuthService }