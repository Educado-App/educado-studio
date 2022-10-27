const connectDb = require('../../../__tests__/fixtures/db')

const makeFakeUser = require('../../../__tests__/fixtures/fakeUser')
const { userList } = require('../../users/gateways')
const { makeUser } = require('../../users/domain')
const { authService } = require('.')

describe('Authentication Handler', () => {

    beforeAll(() => connectDb())
    afterEach(async () => await userList.remove({}))

    it("succesfully authenticates a valid user", async () => {
        const fakeUser = makeFakeUser()

        const user = makeUser(fakeUser)
        await userList.add(user)

        const result = await authService.authenticate(fakeUser)

        expect(result.accessToken).toMatch('ey')
        expect(result.refreshToken).toMatch('ey')
    })

})