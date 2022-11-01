const { makeCourse } = require('.')
const makeFakeCourse = require('../../../__tests__/fixtures/courses/fakeCourse')
const makeFakeSection = require('../../../__tests__/fixtures/courses/fakeSection')

describe('Course', () => {

    it('gives sections a sequential section number', async () => {
        const fakeCourse = makeFakeCourse()

        const course = makeCourse(fakeCourse)
        const section1 = makeFakeSection()
        const section2 = makeFakeSection()

        course.addSection(section1)
        course.addSection(section2)

        expect(course.getSections()[0].getSectionNumber()).toBe(1)
        expect(course.getSections()[1].getSectionNumber()).toBe(2)
        
    })
})