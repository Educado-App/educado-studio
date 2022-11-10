const { registerAppUser } = require('../../use-cases/appUsers')
const makeRegisterAppUser = require('./registerAppUser')

const registerNewAppUser = makeRegisterAppUser({registerAppUser})

// const AppUserController = Object.freeze({
//     registerNewAppUser
// })

//export default AppUserController

module.exports = { registerNewAppUser } 