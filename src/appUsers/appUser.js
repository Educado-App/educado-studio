module.exports = function buildMakeAppUser({ Phone, Password }) {

    return function makeAppUser({
        phone,
        password,
        loggedInAt = new Date()
    } = {}) {

        if (!Phone.isValid(phone)) throw new Error("User must have a valid phone number")
        if (!password) throw new Error("User must have a password")
        if (!(password.length >= 8)) throw new Error("Password should be atleast 8 characters long")
        if (password.search("[A-Z]") == -1) throw new Error("Password must contain a capital letter")

        const { salt, hash } = Password.encrypt(password)

        return Object.freeze({
            phone: phone,
            salt: salt,
            hash: hash,
            loggedInAt: loggedInAt
        })

    }
}