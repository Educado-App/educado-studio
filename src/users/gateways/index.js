const Id = require('../../helpers/id')

const { UserModel } = require('../db-models/User')
const { ProfileModel } = require('../db-models/Profile')

const makeUserList = require('./userList')
const makeProfileList = require('./profileList')

const userList = makeUserList(UserModel)
const profileList = makeProfileList({ dbModel: ProfileModel, Id })

module.exports = { profileList, userList }