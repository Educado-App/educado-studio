const Id = require("../../src/helpers/Id")

module.exports = function makeFakeUser() {

    return {
        id: Id.makeId(),
        email: "fake@gmail.com",
        password: "ABC123456!",
        googleID: "1234567891011",
        joinedAt: new Date(),
        modifiedAt: new Date()
    }

}