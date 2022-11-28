const Id = require("../../src/helpers/Id")
const makeFakeUser = require('./fakeUser')

module.exports = function makeFakeProfile(overides = {}) {

    const profile = {
        id: Id.makeId(),
        firstName: "fake",
        lastName: "man",
        user: makeFakeUser()
    }

    return {
        ...profile,
        ...overides
    }

}