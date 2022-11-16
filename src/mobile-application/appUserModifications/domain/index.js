const Phone = require("../../../helpers/phone")
const Password = require('../../../helpers/password')

const buildMakeAppUser = require('./appUser')
const makeAppUser = buildMakeAppUser({ Phone, Password })

module.exports = { makeAppUser }

const buildMakeUser = require('./appUser')
const makeUser = buildMakeUser({ Phone, Password })

module.exports = { makeUser }