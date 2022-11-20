/**
  * index for app user controllers
  * 
  * Last Modified: 20-11-2022
  **/

const { appUserList } = require('../gateways')
const phone = require('../../../helpers/phone')

const makeRegisterAppUser = require('./registerAppUser')
const makeDeleteAppUser = require('./deleteAppUser')
const appUserController = makeRegisterAppUser({ appUserList, phone })
const deleteAppUser = makeDeleteAppUser({appUserList})

module.exports = { appUserController, deleteAppUser }