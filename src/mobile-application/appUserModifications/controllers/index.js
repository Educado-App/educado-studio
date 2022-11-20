// const { registerAppUser } = require('../use-cases')
// const registered = require('./registerAppUser')
// const { makeAppUser } = require('../data-access')

// appUserList

// const registerNewAppUser = registered({ makeAppUser })

// // const AppUserController = Object.freeze({
// //     registerNewAppUser
// // })


// module.exports = { registerNewAppUser } 

const { appUserList } = require('../gateways')
const phone = require('../../../helpers/phone')

const makeRegisterAppUser = require('./registerAppUser')
const makeDeleteAppUser = require('./deleteAppUser')
const appUserController = makeRegisterAppUser({ appUserList, phone })

module.exports = { appUserController, makeDeleteAppUser }