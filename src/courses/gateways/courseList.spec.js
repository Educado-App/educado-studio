const connectDb = require('../../../__tests__/fixtures/db')
const { makeCourse } = require('../domain/index')
const makeFakeCourse = require('../../../__tests__/fixtures/fakeCourse')
const makeFakeSection = require('../../../__tests__/fixtures/fakeSection')
const { courseList } = require('.')

describe('course list', () => {

    beforeAll(() => connectDb())
    afterEach(async () => await courseList.remove({}))

    it('can add a new course in a list', async () => {
        const fakeCourse = makeFakeCourse()
        const course = makeCourse(fakeCourse)

        course.addSection(makeFakeSection())
        course.addSection(makeFakeSection())
        course.addSection(makeFakeSection())

        const added = await courseList.add(course)

        expect(added).toMatchObject(course)
    })
})