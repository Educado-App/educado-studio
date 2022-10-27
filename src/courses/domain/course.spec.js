const { makeCourse } = require('.')
const makeFakeCourse = require('../../../__tests__/fixtures/fakeCourse')
const makeFakeSection = require('../../../__tests__/fixtures/fakeSection')

describe('Course', () => {


    xit('can add sections to itself', () => {
        const fakeCourse = makeFakeCourse()

        const course = makeCourse(fakeCourse)
        course.addSection(makeFakeSection())
        course.addSection(makeFakeSection())
        course.addSection(makeFakeSection())

        expect(course.sections.length).toBe(3)
    })

    xit('maintains the sequence ordering of sections', () => {
        const fakeCourse = makeFakeCourse()

        const course = makeCourse(fakeCourse)
        const section1 = makeFakeSection({ sequenceNumber: 1 })
        const section2 = makeFakeSection({ sequenceNumber: 2 })
        course.addSection(section1)
        
        
        expect(() => course.addSection(section2)).toThrow()
    })

    it('can be marked as published for a course', () => {
        const fakeCourse = makeFakeCourse()

        const course = makeCourse(fakeCourse)
        
        expect(course.isPublished()).toBe(false)

        course.publish();

        expect(course.isPublished()).toBe(true)
    })
})