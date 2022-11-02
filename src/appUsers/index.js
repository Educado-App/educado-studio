const {AppUser} = require("../models/AppUser")

const Phone = require("../helpers/phone")
const Password = require('../helpers/password')

const buildMakeAppUser = require('./appUser')
const makeAppUser = buildMakeAppUser({ Phone, Password })

module.exports = { makeAppUser }