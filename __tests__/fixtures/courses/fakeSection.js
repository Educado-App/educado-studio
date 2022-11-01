const Id = require("../../../src/helpers/Id")

module.exports = function makeFakeSection(overides = {}) {

    const section = {
        id: Id.makeId(),
        title: 'Basic testing',
        description: "Introduction to testing",
        exercises: []
    }

    return {
        ...section,
        ...overides
    }
}