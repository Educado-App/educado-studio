const JWT = require('../utils/jwt')
const Password = require('../../../helpers/password')
const { userList } = require('../../../users/gateways')

const buildMakeAuthService = require('./authService')
const makeAuthService = buildMakeAuthService({ Password, JWT })
const authService = makeAuthService(userList)

module.exports = { authService }