/**
  * index for login service
  * Injects needed information for the service
  * 
  * Last Modified: 28-11-2022
  **/

const JWT = require('../../../security/authentication/utils/jwt')
const Password = require('../../../helpers/password')
const { appUserList } = require('../../appUserModifications/gateways')


const buildMakeAppAuthService = require('../../appSecurity/services/appAuthService')
const makeAppAuthService = buildMakeAppAuthService({ Password, JWT })
const appAuthService = makeAppAuthService(appUserList)


module.exports = { appAuthService }