const JWT = require('../../helpers/jwt')
const Password = require('../../helpers/password')
const { userList } = require('../../users')

const buildMakeAuthService = require('./authService')
const makeAuthService = buildMakeAuthService({ Password, JWT })
const authService = makeAuthService(userList)

module.exports = { authService }