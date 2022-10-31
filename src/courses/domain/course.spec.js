const { makeCourse } = require('.')
const makeFakeCourse = require('../../../__tests__/fixtures/fakeCourse')
const makeFakeSection = require('../../../__tests__/fixtures/fakeSection')

describe('Course', () => {

    xit('can be marked as published for a course', () => {
        const fakeCourse = makeFakeCourse()

        const course = makeCourse(fakeCourse)
        
        expect(course.isPublished()).toBe(false)

        course.publish();

        expect(course.isPublished()).toBe(true)
    })
})