const { registerAppUser } = require('.')
const makeFakeAppUser = require('../../../../__tests__/fixtures/fakeAppUser')

describe ('register app user', () => {
    

    it('inserts app user in database', async() => {
        const newAppUser = makeFakeAppUser()
        await registerAppUser(newAppUser)

        expect(newAppUser).not.toBe(null)
        expect(newAppUser.phone).toMatch('12345678')
    })

    it('Cannot add app user if phone number already exists', async() => {
        const newAppUser = makeFakeAppUser()
        const repeatAppUser = makeFakeAppUser()

        await registerAppUser(newAppUser)

        await registerAppUser(repeatAppUser)

        expect(repeatAppUser).not.toBe(null)
    })
})