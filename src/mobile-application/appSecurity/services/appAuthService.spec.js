const makeFakeAppUser = require('../../../../__tests__/fixtures/fakeAppUser')
const { appUserList } = require('../../../mobile-application/appUserModifications/gateways')
const { makeUser } = require('../../../mobile-application/appUserModifications/domain')
const { appAuthService } = require('.')

describe('Authentication Handler', () => {

    it("succesfully authenticates a valid app user", async () => {
        const validAppUser = makeFakeAppUser()
        await appUserList.add(makeUser(validAppUser))

        const result = await appAuthService.authenticateApp(validAppUser)

        expect(result.accessToken).toMatch('ey')
        expect(result.refreshToken).toMatch('ey')
    })
})