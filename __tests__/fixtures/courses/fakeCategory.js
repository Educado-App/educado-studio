const Id = require("../../../src/helpers/Id")

module.exports = function makeFakeProfile(overides = {}) {

    const category = {
        id: Id.makeId(),
        name: "Software Testing",
        logo: "https://en.wikipedia.org/wiki/Test-driven_development#/media/File:TDD_Global_Lifecycle.png"
    }

    return {
        ...category,
        ...overides
    }

}