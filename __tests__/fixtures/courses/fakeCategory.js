const Id = require("../../../src/helpers/Id")

const makeFakeFile = require('../fakeFile')

module.exports = function makeFakeProfile(overides = {}) {

    const category = {
        id: Id.makeId(),
        name: "Software Testing",
        logo: makeFakeFile()
    }

    return {
        ...category,
        ...overides
    }

}