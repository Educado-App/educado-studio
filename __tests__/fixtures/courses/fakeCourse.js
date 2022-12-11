const Id = require("../../../src/helpers/Id")
const makeFakeProfile = require('../fakeProfile')
const makeFakeCategory = require('./fakeCategory')
const makeFakeFile = require('../fakeFile')

module.exports = function makeFakeCourse(overrides = {}) {

    const course = {
        id: Id.makeId(),
        title: 'Basic testing',
        category: makeFakeCategory(),
        description: 'A course about testing',
        coverImg: makeFakeFile(),
        author: makeFakeProfile(),
        sections: [],
        published: false,
        createdAt: new Date(),
        modifiedAt: new Date(),
    }

    return {
        ...course,
        ...overrides
    }
}