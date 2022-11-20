//import { makeRegisterAppUser } from './registerAppUser'
//import { appUserDb } from '../data-access'
const phone = require('../../../helpers/phone')
const password = require('../../../helpers/password')
const JWT = require('../../../security/authentication/utils/jwt')
const { appUserList } = require('../gateways')

const makeRegisterAppUser = require('./registerAppUser')
//const buildMakeLoginAppUser = require('./loginAppUser')
const makeDeleteAppUser = require('./deleteAppUser')

const registerAppUser = makeRegisterAppUser( {appUserList, phone, password} )
//const loginAppUser = buildMakeLoginAppUser({ JWT, password })
const deleteAppUser = makeDeleteAppUser( {appUserList} )
//const authService = loginAppUser(appUserList)



//export default appUserService
module.exports = { registerAppUser, deleteAppUser }