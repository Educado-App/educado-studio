const Id = require("../../../src/helpers/Id")

module.exports = function makeFakeProfile(overides = {}) {

    const category = {
        id: Id.makeId(),
        name: "Software Testing",
        logo: "TDD_Global_Lifecycle.png"
    }

    return {
        ...category,
        ...overides
    }

}