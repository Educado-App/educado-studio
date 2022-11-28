const makeFakeCourse = require('../../../__tests__/fixtures/courses/fakeCourse')
const makeFakeUser = require('../../../__tests__/fixtures/fakeUser')
const { courseList } = require('../gateways')
const { editCourse } = require('.')

describe('Edit Course', () => {

    afterEach(async () => await courseList.remove({}))

    it('successfully changes the title of an existing course', async () => {
        const fakeUser = makeFakeUser({})
        const fakeCourse = makeFakeCourse({ title: "A fake title", description: "Hello my friend", fakeUser })
        const added = await courseList.add(fakeCourse)
        
        const changed = await editCourse({ ...added, title: "I didn't like the previous title..." })
        
        expect(changed).not.toBe(null)
        expect(changed.title).toBe("I didn't like the previous title...")
    })

})