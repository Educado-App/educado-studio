const Email = require('../../helpers/Email')
const Password = require('../../helpers/password')

const buildMakeUser = require('../domain/user')
const makeUser = buildMakeUser({ Email, Password })

module.exports = { makeUser }