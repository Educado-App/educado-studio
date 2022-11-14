// const {AppUser} = require("../models/AppUser")

const Phone = require("../../../helpers/phone")
const Password = require('../../../helpers/password')

const buildMakeAppUser = require('./appUser')
const makeAppUser = buildMakeAppUser({ Phone, Password })

module.exports = { makeAppUser }


const { appUserModel } = require('../data-access/appUserDb')



const makeUserList = require('../../../users/userList')
const userList = makeUserList(appUserModel)

const buildMakeUser = require('./appUser')
const makeUser = buildMakeUser({ Phone, Password })

module.exports = { makeUser, userList }