const connectDb = require('../../../__tests__/fixtures/db')
const makeFakeCourse = require("../../../__tests__/fixtures/fakeCourse")
const { courseList } = require('../gateways')
const { editCourse } = require('.')

describe('Edit Course', () => {

    beforeAll(() => connectDb())
    afterEach(async () => await courseList.remove({}))

    it('successfully changes the title of an existing course', async () => {
        const fakeCourse = makeFakeCourse({ title: "A fake title" })
        const added = await courseList.add(fakeCourse)
        
        const changed = await editCourse({ ...added, title: "I didn't like the previous title..." })
        
        expect(changed).not.toBe(null)
        expect(changed.title).toBe("I didn't like the previous title...")
    })

})