import makeRegisterAppUser from './registerAppUser'
import appUserDb from '../data-access'

const registerAppUser = makeRegisterAppUser(appUserDb)

const appUserService = Object.freeze({
    registerAppUser,
})

export default appUserService
export { registerAppUser }