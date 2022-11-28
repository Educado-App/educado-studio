const makeFakeAppUser = require('../../../../__tests__/fixtures/fakeAppUser')
const { deleteAppUserController: removeAppUser } = require('.')
const { appUserList } = require('../gateways')

describe('App user deletion controller', () => {
 
    it('Successfully delete an app user', async () => {

        const fakeAppUser = makeFakeAppUser()
        await appUserList.add(fakeAppUser)

        const request = {
            header: { 'Content-Type': 'application/json' },
            params: { id: fakeAppUser.id },
        }

        const response = await removeAppUser(request)

        expect(response.statusCode).toBe(200)
        expect(response.success).toBe(true)
    })
})