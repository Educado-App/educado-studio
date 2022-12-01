const Phone = require("../../../helpers/phone")
const Password = require('../../../helpers/password')

const buildMakeAppUser = require('./appUser')
const makeUser = buildMakeAppUser({ Phone, Password })

module.exports = { makeUser }