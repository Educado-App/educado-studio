const { registerAppUser } = require('../use-cases')
const makeRegisterAppUser = require('./registerAppUser')
const { makeAppUser } = require('../data-access')

const registerNewAppUser = makeRegisterAppUser({ makeAppUser })

// const AppUserController = Object.freeze({
//     registerNewAppUser
// })


module.exports = { registerNewAppUser } 