/**
  * Login service for an app user
  * 
  * Last Modified: 28-11-2022
  **/

const { AuthenticationError } = require('../../../helpers/error')

module.exports = function buildMakeAppAuthService({ Password, JWT }) {

    return function makeAppAuthService(appUserList) {

        return Object.freeze({
            authenticateApp
        })

        async function authenticateApp(appUser) {

            // Finds users phone number
            const foundAppUser = await appUserList.findByPhone(appUser.phone) 

            if (!foundAppUser) { throw new AuthenticationError("Authentication: Access denied") }

            // If phone number exists it takes the password
            // and through the password helper it verifies the hash is correct
            // using the given password and found salt.
            const isAuthenticated = Password.isValid({
                password: appUser.password,
                salt: foundAppUser.salt,
                hash: foundAppUser.hash
            })

            if (!isAuthenticated) { throw new AuthenticationError("Authentication: Access denied") }

            return {
                'accessToken': JWT.signAccessToken({ appUser: foundAppUser.id }),
                'refreshToken': JWT.signRefreshToken({ appUser: foundAppUser.id }),
            }
        }

    }
}