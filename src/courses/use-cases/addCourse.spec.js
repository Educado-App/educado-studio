const connectDb = require('../../../__tests__/fixtures/db')
const makeFakeCourse = require("../../../__tests__/fixtures/courses/fakeCourse")
const { courseList } = require('../gateways')
const { addCourse } = require('.')

describe('Add Empty Course', () => {

    beforeAll(() => connectDb())
    afterEach(async () => await courseList.remove({}))

    it('adds a course to the db', async () => {
        const fakeCourse = makeFakeCourse()

        const added = await addCourse(fakeCourse)

        expect(added).not.toBe(null)
        expect(added.title).toMatch(fakeCourse.title)
    })
})