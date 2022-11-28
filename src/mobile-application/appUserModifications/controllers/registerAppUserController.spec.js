const makeFakeAppUser = require('../../../../__tests__/fixtures/fakeAppUser')
const { registerAppUserController: addAppUser } = require('.')

describe('App user registration controller', () => {
 
    it('Successfully posts a new user', async () => {

        const fakeAppUser = makeFakeAppUser()

        request = {
            header: { 'Content-Type': 'application/json' },
            body: fakeAppUser
        }

        const response = await addAppUser(request)

        expect(response.statusCode).toBe(201)
        expect(response.success).toBe(true)
    })

    // it('Does not post new user if it is a duplicate', async () => {
    //     const fakeAppUser = makeFakeAppUser()
    //     const repeatFakeUser = makeFakeAppUser()

    //     request = {
    //         header: { 'Content-Type': 'application/json' },
    //         body: fakeAppUser
    //     }

    //     repeatRequest = {
    //         header: { 'Content-Type': 'application/json' },
    //         body: repeatFakeUser
    //     }

    //     await addAppUser(request)
    //     await addAppUser(repeatRequest) 

    //     expect(repeatRequest.statusCode).toBe(400)
    //     expect(repeatRequest.success).toBe(false)
    // })
})