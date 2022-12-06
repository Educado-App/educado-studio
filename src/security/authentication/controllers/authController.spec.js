const makeFakeUser = require('../../../../__tests__/fixtures/fakeUser')

const { userList } = require('../../../users/gateways')
const { makeUser } = require('../../../users/domain')
const { authController: handle } = require('.')
const JWT = require('../utils/jwt')

describe('Authentication Endpoint Handler', () => {

    afterEach(async () => await userList.remove({}))

    it('handles login of a user', async () => {
        await userList.add(makeUser(makeFakeUser()))

        const request = {
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

    it("generates a new token pair from a valid refresh token", async () => {
        const validUser = makeFakeUser()
        await userList.add(makeUser(validUser))

        const request = {
            method: 'GET',
            headers: { authorization: `Bearer ${JWT.signRefreshToken({ user: validUser.id })}` },
            context: {
                profile: { user: validUser.id}
            }
        }

        const response = await handle(request)

        expect(response.success).toBe(true)
        expect(response.data.refreshToken).not.toBeNull()
    })

    it("throws error when refresh token is expired", async () => {
        const validUser = makeFakeUser()
        await userList.add(makeUser(validUser))

        const expiredRefreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzhkZjhmMDFhYTdhYTVhN2RiM2Y3ZTIiLCJpYXQiOjE2NzAyNDg2OTMsImV4cCI6MTY3MDI0ODc1M30.Ltom1z5Dp4bjUqiyP-7nz8qfhnfGqqepPP1pG9luo0k'
        const request = {
            method: 'GET',
            headers: { authorization: `Bearer ${expiredRefreshToken}` },
            context: {
                profile: { user: validUser.id}
            }
        }

        expect(handle(request))
            .rejects
            .toThrow()
    })
})