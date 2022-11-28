const makeFakeCourse = require('../../../__tests__/fixtures/courses/fakeCourse')
const makeFakeProfile = require('../../../__tests__/fixtures/fakeProfile')

describe('Content Creator Application List', () => {

    afterEach(async () => {
        await courseList.remove({})
        await profileList.remove({})
    })

    const { courseList } = require('.')
    const { profileList } = require('../../users/gateways')

    it('finds all courses by an author', async () => {
        const fakeAuthor = makeFakeProfile()
        const fakeCourse1 = makeFakeCourse({ author: fakeAuthor })
        const fakeCourse2 = makeFakeCourse({ author: fakeAuthor })

        await profileList.add(fakeAuthor)
        await courseList.add(fakeCourse1)
        await courseList.add(fakeCourse2)

        const [course1, course2] = await courseList.findAllByAuthor({ id: fakeAuthor.id })

        expect(course1.author.id).toEqual(fakeAuthor.id)
        expect(course2.author.id).toEqual(fakeAuthor.id)
    })

    it('finds a course by id', async () => {
        const fakeCourse = makeFakeCourse()
        await courseList.add(fakeCourse)

        const found = await courseList.findById(fakeCourse.id)

        expect(found.id).toEqual(fakeCourse.id)
    })

})