const makeFakeCourse = require("../../../__tests__/fixtures/courses/fakeCourse")
const makeFakeSection = require("../../../__tests__/fixtures/courses/fakeSection")
const { setupCourse, teardownCourse } = require('../../../__tests__/fixtures/courses/course')
const { courseList } = require('../gateways')
const { addSection } = require('.')

describe('Add section', () => {

    it('successfully adds sections to a course', async () => {
        const fakeCourse = makeFakeCourse()
        await setupCourse(fakeCourse)

        const section1 = makeFakeSection({ title: "Section 1" })
        const section2 = makeFakeSection({ title: "Section 2" })

        await addSection({ info: section1, toCourse: fakeCourse.id })
        await addSection({ info: section2, toCourse: fakeCourse.id })

        const course = await courseList.findById(fakeCourse.id)

        expect(course.sections.length).toBe(2)

        await teardownCourse(fakeCourse)
    })

})