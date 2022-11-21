/**
  * Index fo use-cases.
  * Used to inject dependecies to the use-cases and export them
  * 
  * Last Modified: 20-11-2022
  * By: Anton + Charlotte
  **/

const phone = require('../../../helpers/phone')
const password = require('../../../helpers/password')
const JWT = require('../../../security/authentication/utils/jwt')
const { appUserList } = require('../gateways')

const makeRegisterAppUser = require('./registerAppUser')
const makeLoginAppUser = require('./loginAppUser')
const makeDeleteAppUser = require('./deleteAppUser')

const registerAppUser = makeRegisterAppUser( {appUserList, phone, password} )
const authenticateAppUser = makeLoginAppUser({ appUserList, JWT, password })
const deleteAppUser = makeDeleteAppUser( {appUserList} )
//const authService = loginAppUser(appUserList)



//export default appUserService
module.exports = { registerAppUser, authenticateAppUser, deleteAppUser }