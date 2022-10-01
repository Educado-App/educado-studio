module.exports = function buildMakeUser({ Email }) {

    return function makeUser({
        email,
        password,
        joinedAt = new Date()
    } = {}) {

        if (!Email.isValid(email)) {
            throw new Error("User must have a valid email")
        }

        if (
            !password ||
            password.length < 8 ||
            password.search("[A-Z]") == -1
        ) { throw new Error("Invalid password") }

        return Object.freeze({
            email: email,
            password: password,
            joinedAt: joinedAt
        })

    }
}