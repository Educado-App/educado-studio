const { UserModel } = require('../db-models/User')
const { ProfileModel } = require('../db-models/Profile')

const makeUserList = require('./userList')
const makeProfileList = require('./profileList')

const userList = makeUserList(UserModel)
const profileList = makeProfileList(ProfileModel)

module.exports = { profileList, userList }