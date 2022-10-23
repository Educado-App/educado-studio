const Id = require("../../src/helpers/Id")

module.exports = function makeFakeCourse(overides = {}) {

    const fakeCourse = {
        id: Id.makeId(),
        category: 'Testing',
        title: 'Basic testing',
        description: 'A course about testing',
    }

    return {
        ...fakeCourse,
        ...overides
    }
}