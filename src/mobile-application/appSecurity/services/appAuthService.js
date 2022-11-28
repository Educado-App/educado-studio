const { AuthenticationError } = require('../../../helpers/error')

module.exports = function buildMakeAppAuthService({ Password, JWT }) {

    return function makeAppAuthService(appUserList) {

        return Object.freeze({
            authenticateApp
        })

        async function authenticateApp(appUser) {

            const foundAppUser = await appUserList.findByPhone(appUser.phone) 

            if (!foundAppUser) { throw new AuthenticationError("Authentication: Access denied") }

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