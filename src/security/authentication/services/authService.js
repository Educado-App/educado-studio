const { AuthenticationError } = require('../../../helpers/error')

module.exports = function buildMakeAuthService({ Password, JWT }) {

    return function makeAuthService(userList) {

        return Object.freeze({
            authenticate,
        })

        async function authenticate(user) {

            const foundUser = await userList.findByEmail(user.email)

            if (!foundUser) { throw new AuthenticationError("Authentication: Access denied") }

            const isAuthenticated = Password.isValid({
                password: user.password,
                salt: foundUser.salt,
                hash: foundUser.hash
            })

            if (!isAuthenticated) { throw new AuthenticationError("Authentication: Access denied") }

            return JWT.generateTokenPair({ user: foundUser.id })
        }
    }
}