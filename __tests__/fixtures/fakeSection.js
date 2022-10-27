const Id = require("../../src/helpers/Id")

module.exports = function makeFakeSection(overides = {}) {

    const section = {
        id: Id.makeId(),
        title: 'Basic testing',
        sequenceNumber: 1
    }

    return {
        ...section,
        ...overides
    }
}