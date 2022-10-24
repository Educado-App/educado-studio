const Id = require("../../src/helpers/Id")
const makeFakeUser = require('./fakeUser')

module.exports = function makeFakeCourse(overrides = {}) {

    const fakeCourse = {
        id: Id.makeId(),
        category: 'Testing',
        author: makeFakeUser(),
        title: 'Basic testing',
        description: 'A course about testing',
    }

    return {
        ...fakeCourse,
        ...overrides
    }
}