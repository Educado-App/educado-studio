module.exports = function buildMakeUser({ Email, Password }) {

    return function makeUser({
        googleId,
        email,
        password,
        joinedAt = new Date(),
        modifiedAt = new Date()
    } = {}) {

        if (!Email.isValid(email)) throw new Error("User must have a valid email")

        if (!password) throw new Error("User must have a password")
        if (!(password.length >= 8)) throw new Error("Password should be atleast 8 characters long")
        if (password.search("[A-Z]") == -1) throw new Error("Password must contain a capital letter")

        const { salt, hash } = Password.encrypt(password)

        return Object.freeze({
            googleId: googleId,
            email: email,
            salt: salt,
            hash: hash,
            joinedAt: joinedAt,
            modifiedAt: modifiedAt
        })

    }
}