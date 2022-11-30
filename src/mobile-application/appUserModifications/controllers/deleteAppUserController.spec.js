const makeFakeAppUser = require('../../../../__tests__/fixtures/fakeAppUser')
const { deleteAppUserController: handle } = require('.')
const { appUserList } = require('../gateways')

describe('App user deletion controller', () => {
 
    it('Successfully delete an app user', async () => {

        const fakeAppUser = makeFakeAppUser()
        await appUserList.add(fakeAppUser)

        const request = {
            header: { 'Content-Type': 'application/json' },
            method: 'DELETE',
            params: { id: fakeAppUser.id },
        }

        const response = await handle(request)

        expect(response.statusCode).toBe(200)
        expect(response.success).toBe(true)
    })
})