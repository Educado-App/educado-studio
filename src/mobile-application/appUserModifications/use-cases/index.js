//import { makeRegisterAppUser } from './registerAppUser'
//import { appUserDb } from '../data-access'
const phone = require('../../../helpers/phone')
const password = require('../../../helpers/password')

const {userList} = require('../../../users')
const { appUserList } = require('../gateways')

const makeRegisterAppUser = require('./registerAppUser')

const registerAppUser = makeRegisterAppUser( {userList, appUserList, phone, password} )

const appUserService = Object.freeze({
    registerAppUser
})

//export default appUserService
module.exports = { registerAppUser }