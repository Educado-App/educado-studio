const connectDb = require('../../../__tests__/fixtures/db')
const makeFakeCourse = require("../../../__tests__/fixtures/fakeCourse")
const { courseList } = require('../gateways')
const { addCourse } = require('.')

describe('Add Empty Course', () => {

    beforeAll(() => connectDb())
    afterEach(async () => await courseList.remove({}))

    it('adds course to db', async () => {
        const fakeCourse = makeFakeCourse()

        await addCourse(fakeCourse)

        expect(courseList.findAll().length).toBe(1)
    })
})