const makeFakeAppUser = require('../../../../__tests__/fixtures/fakeAppUser')
const { appUserList } = require('../../../mobile-application/appUserModifications/gateways')
const { makeUser } = require('../../../mobile-application/appUserModifications/domain')
const { appAuthController: handle } = require('.')

describe('Authentication App Endpoint Handler', () => {

    it('handles login of an app user', async () => {
        const validAppUser = makeFakeAppUser()
        await appUserList.add(makeUser(validAppUser))

        request = {
            header: 'Content-Type: application/json',
            method: 'POST',
            body: {
                phone: "12345678",
                password: "ABc123456!"
            }
        }

        const response = await handle(request)

        expect(response.success).toBe(true)
        expect(response).toHaveProperty('data')
        expect(response.data).toHaveProperty('accessToken')
        expect(response.data).toHaveProperty('refreshToken')
    })
})