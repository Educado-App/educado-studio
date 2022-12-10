const makeFakeAppUser = require('../../../../__tests__/fixtures/fakeAppUser')
const { registerAppUserController: handle } = require('.')

describe('App user registration controller', () => {

    it('Successfully posts a new user', async () => {

        const fakeAppUser = makeFakeAppUser()

        const request = {
            header: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: fakeAppUser
        }

        const response = await handle(request)

        expect(response.statusCode).toBe(201)
        expect(response.success).toBe(true)
    })
})