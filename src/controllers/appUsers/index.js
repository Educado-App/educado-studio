import { registerAppUser } from '../../use-cases/appUsers'
import makeRegisterAppUser from './registerAppUser'

const registerNewAppUser = makeRegisterAppUser({registerAppUser})

const AppUserController = Object.freeze({
    registerNewAppUser
})

export default AppUserController

export { registerNewAppUser }