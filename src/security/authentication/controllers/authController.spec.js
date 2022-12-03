const makeFakeUser = require('../../../../__tests__/fixtures/fakeUser')

const { userList } = require('../../../users/gateways')
const { makeUser } = require('../../../users/domain')
const { authController: handle } = require('.')

describe('Authentication Endpoint Handler', () => {

    afterEach(async () => await userList.remove({}))

    it('handles login of a user', async () => {
        await userList.add(makeUser(makeFakeUser()))

        request = {
            header: 'Content-Type: application/json',
            method: 'POST',
            body: {
                email: "fake@gmail.com",
                password: "ABC123456!"
            }
        }

        const response = await handle(request)

        expect(response.success).toBe(true)
        expect(response).toHaveProperty('data')
        expect(response.data).toHaveProperty('accessToken')
        expect(response.data).toHaveProperty('refreshToken')
    })
    it('throws an error when http method is not implemented', async () => {

        request = {
            header: 'Content-Type: application/json',
            method: 'GET',
        }

        expect(handle(request))
            .rejects
            .toThrow('method GET not allowed')

    })
})