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
const { userList } = require('../../../users')

const makeRegisterAppUser = require('./registerAppUser')
const appUserController = makeRegisterAppUser({ appUserList, UserList: userList, phone })

module.exports = { appUserController }