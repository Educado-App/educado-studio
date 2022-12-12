const { AuthenticationError, ValidationError, NonMatchingPasswordError, SamePasswordError } = require('../../../helpers/error')

module.exports = function buildMakeAuthService({ Password, JWT }) {

    return function makeAuthService(userList) {

        return Object.freeze({
            authenticate,
            changePassword
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

        async function changePassword({ userId, oldPassword, newPassword }) {

            const userToChange = await userList.findById(userId)
            if (!userToChange) throw new ValidationError(`User with id ${userId} not found`)

            const oldPasswordMatchesCurrent = Password.isValid({ password: oldPassword, hash: userToChange.hash, salt: userToChange.salt })
            if (!oldPasswordMatchesCurrent) throw new NonMatchingPasswordError('Old password does not match the current password for this user')

            if (oldPassword === newPassword) throw new SamePasswordError('Old password matches new password. Please change your password to something new')

            const [_, error] = Password.isStrong(newPassword)
            if (error) throw error

            // All criteria met - Changing password
            const { salt, hash } = Password.encrypt(newPassword)
            return await userList.update({ id: userId, salt, hash })

        }
    }
}