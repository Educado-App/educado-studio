const connectDb = require('../../../__tests__/fixtures/db')

const { courseList } = require('.')
const { profileList } = require('../../users/gateways')

const makeFakeCourse = require('../../../__tests__/fixtures/fakeCourse')
const makeFakeProfile = require('../../../__tests__/fixtures/fakeProfile')

describe('Content Creator Application List', () => {

    beforeAll(() => connectDb())
    afterEach(async () => {
        await courseList.remove({})
        await profileList.remove({})
    })

    it('finds all courses by an author', async () => {
        const fakeAuthor = makeFakeProfile()
        const fakeCourse1 = makeFakeCourse({ author: fakeAuthor })
        const fakeCourse2 = makeFakeCourse({ author: fakeAuthor })

        await profileList.add(fakeAuthor)
        await courseList.add(fakeCourse1)
        await courseList.add(fakeCourse2)

        const [course1, course2] = await courseList.findAllByAuthor({ id: fakeAuthor.id })

        expect(course1.author).toEqual(fakeAuthor.id)
        expect(course2.author).toEqual(fakeAuthor.id)
    })

})