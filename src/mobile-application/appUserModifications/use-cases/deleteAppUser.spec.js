const { registerAppUser, deleteAppUser } = require('.')
const makeFakeAppUser = require('../../../../__tests__/fixtures/fakeAppUser')

describe ('delete an app user from collection', () => {

    it('remove app user from database', async() => {
        const newAppUser = makeFakeAppUser()
        await registerAppUser(newAppUser)

        expect(newAppUser).not.toBeNull()

        const removed = await deleteAppUser(newAppUser)

        expect(removed).toBeNull()
    })
})