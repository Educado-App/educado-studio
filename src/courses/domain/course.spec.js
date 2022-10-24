const { makeCourse } = require('.')
const makeFakeCourse = require('../../../__tests__/fixtures/fakeCourse')
const makeFakeSection = require('../../../__tests__/fixtures/fakeSection')

describe('Course', () => {


    it('can add sections to itself', () => {
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
        const section2 = makeFakeSection({ sequenceNumber: 1 })
        course.addSection(section1)
        
        
        expect(() => course.addSection(section2)).toThrow()
    })
})