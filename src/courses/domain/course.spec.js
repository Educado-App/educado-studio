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

        expect(course.getSection(section1).sectionNumber).toBe(1)
        expect(course.getSection(section2).sectionNumber).toBe(2)

    })

    it('can reorder sections', () => {
        const course = makeCourse(makeFakeCourse())
        const section1 = makeFakeSection()
        const section2 = makeFakeSection()
        const section3 = makeFakeSection()

        const sections = [section1, section2, section3]
        sections.forEach(section => course.addSection(section))

        course.moveSectionById({ section: section1.id, to: 3})

        expect(course.getSection(section1).sectionNumber).toBe(3)
        expect(course.getSection(section2).sectionNumber).toBe(1)
        expect(course.getSection(section3).sectionNumber).toBe(2)
    })
})