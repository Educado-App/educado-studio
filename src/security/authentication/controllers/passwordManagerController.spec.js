const makeFakeUser = require('../../../../__tests__/fixtures/fakeUser')

const { userList } = require('../../../users/gateways')
const { makeUser } = require('../../../users/domain')

const { passwordManagerController: handle } = require('.')

describe('Password Manager Controller', () => {

    afterEach(async () => await userList.remove({}))

    it('successfully changes the password of an existing user', async () => {
        const originalPassword = "ABC123456!"
        const aNewPassword = "ABCDE12345678!!!"

        const fakeUser = makeFakeUser({ password: originalPassword })
        const originalUserInfo = await userList.add(makeUser(fakeUser))

        const request = {
            method: 'PUT',
            context: {
                profile: { user: fakeUser.id }
            },
            body: {
                oldPassword: originalPassword,
                newPassword: aNewPassword
            }
        }

        const response = await handle(request)

        const oldPasswordHash = originalUserInfo.hash
        const newPasswordHash = response.data.hash

        expect(newPasswordHash).not.toMatch(oldPasswordHash)
    })
})