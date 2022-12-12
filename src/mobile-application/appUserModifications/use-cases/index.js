/**
  * Index fo use-cases.
  * Used to inject dependecies to the use-cases and export them
  * 
  * Last Modified: 20-11-2022
  **/

const phone = require('../../../helpers/phone')
const password = require('../../../helpers/password')
const { appUserList } = require('../gateways')

const makeRegisterAppUser = require('./registerAppUser')
const makeDeleteAppUser = require('./deleteAppUser')

const registerAppUser = makeRegisterAppUser({ appUserList, phone, password })
const deleteAppUser = makeDeleteAppUser({ appUserList })



//export default appUserService
module.exports = { registerAppUser, deleteAppUser }