/**
  * index for app user controllers
  * 
  * Last Modified: 20-11-2022
  **/

const { appUserList } = require('../gateways')
const phone = require('../../../helpers/phone')

const makeRegisterAppUser = require('./registerAppUserController')
const makeDeleteAppUser = require('./deleteAppUserController')
const registerAppUserController = makeRegisterAppUser({ appUserList, phone })
const deleteAppUserController = makeDeleteAppUser({appUserList})

module.exports = { registerAppUserController, deleteAppUserController }