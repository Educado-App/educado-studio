const makeUser = require("../../users")

module.exports = function makeFakeUser() {

    return makeUser({
        email: "fakeuser@gmail.com",
        password: "ABC123456!",
        googleId: "12345678910",
        joinedAt: "2000-1-1T12:00:00.000Z"
    })

}