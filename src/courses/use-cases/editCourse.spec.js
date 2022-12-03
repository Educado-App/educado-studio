const makeFakeCourse = require('../../../__tests__/fixtures/courses/fakeCourse')

const { setupCourse, teardownCourse } = require('../../../__tests__/fixtures/courses/setup-teardown')
const { courseList } = require('../gateways')
const { editCourse } = require('.')

describe('Edit Course', () => {

    afterEach(async () => await courseList.remove({}))

    it('successfully changes the title of an existing course', async () => {
        const fakeCourse = makeFakeCourse({ title: "A fake title", description: "Hello my friend" })
        const added = await setupCourse(fakeCourse)
        
        const changed = await editCourse({ id: added.id, title: "I didn't like the previous title..." })
        
        expect(changed).not.toBe(null)
        expect(changed.title).toBe("I didn't like the previous title...")

        await teardownCourse(fakeCourse)
    })

})