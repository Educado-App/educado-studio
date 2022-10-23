const Id = require("../../src/helpers/Id")

module.exports = function makeFakeSection(overides = {}) {

    const fakeSection = {
        id: Id.makeId(),
        title: 'Basic testing',
        sequenceNumber: 1
    }

    return {
        ...fakeSection,
        ...overides
    }
}