const { appUserModel } = require('../data-access/appUserDb')

const makeAppUserList = require('./appUserList')
const appUserList = makeAppUserList({ dbModel: appUserModel})

module.exports = { appUserList }