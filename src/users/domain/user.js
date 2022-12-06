const { ValidationError } = require("../../helpers/error")

module.exports = function buildMakeUser({ Id, Email, Password }) {

    return function makeUser({
        id = Id.makeId(),
        googleId,
        email,
        password,
        joinedAt = new Date(),
        modifiedAt = new Date()
    } = {}) {

        if (!Email.isValid(email))          throw new ValidationError("User must have a valid email")
        if (!password)                      throw new ValidationError("User must have a password")

        const [_, error] = Password.isStrong(password)
        if (error) throw error
        
        const { salt, hash } = Password.encrypt(password)

        return Object.freeze({
            id: id,
            googleId: googleId,
            email: email,
            salt: salt,
            hash: hash,
            joinedAt: joinedAt,
            modifiedAt: modifiedAt
        })

    }
}