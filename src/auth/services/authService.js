module.exports = function buildMakeAuthService({ Password, JWT }) {

    return function makeAuthService(userList) {

        return Object.freeze({
            authenticate,
        })

        async function authenticate(user) {

            const foundUser = await userList.findOneByEmail(user.email)
            if (!foundUser) { throw new Error("Authentication: Access denied") }

            const isAuthenticated = Password.isValid({
                password: user.password, 
                salt: foundUser.salt,
                hash: foundUser.hash
            })

            if (!isAuthenticated) { throw new Error("Authentication: Access denied") }

            return {
                'accessToken': JWT.signAccessToken({ user: foundUser.id }),
                'refreshToken': JWT.signRefreshToken({ user: foundUser.id }),
            }
        }
    }

}