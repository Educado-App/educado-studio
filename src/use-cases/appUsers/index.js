//import { makeRegisterAppUser } from './registerAppUser'
//import { appUserDb } from '../data-access'
const phone = require('../../helpers/phone')
const password = require('../../helpers/password')

const makeRegisterAppUser = require('./registerAppUser')
const appUserDb = require('../../data-access/appUser')

const registerAppUser = makeRegisterAppUser( {appUserDb, phone, password} )

// const appUserService = Object.freeze({
//     registerAppUser
// })

//export default appUserService
module.exports = { registerAppUser } 