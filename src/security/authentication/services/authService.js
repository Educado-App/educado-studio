module.exports = function buildMakeAuthService({ Password, JWT }) {

    return function makeAuthService(userList) {

        return Object.freeze({
            authenticate,
        })

        async function authenticate(user) {

            const foundUserEmail = await userList.findByEmail(user.email)

            if (foundUserEmail == null) {

                const foundUserPhone = await userList.findByPhone(user.phone)

                if (!foundUserPhone) { throw new Error("Authentication: Invalid Phone Number") }
            }

            if (!foundUserEmail) { throw new Error("Authentication: Invalid Email") }

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