const { registerAppUser } = require('.')
const { appUserList } = require('../gateways')
const makeFakeAppUser = require('../../../../__tests__/fixtures/fakeAppUser')

describe ('register app user', () => {
    let newAppUser

    it('inserts app user in database', async() => {
        newAppUser = makeFakeAppUser()
        await registerAppUser(newAppUser)

        expect(newAppUser).not.toBe(null)
        expect(newAppUser.phone).toMatch('12345678')
    })

    // it('Cannot add app user if phone number already exists', async() => {
    //     const newAppUser = makeFakeAppUser()
    //     const repeatAppUser = makeFakeAppUser()

    //     const insertedAppUserOne = await registerAppUser(newAppUser)

    //     const insertedAppUserTwo = await registerAppUser(repeatAppUser)

    //     expect(insertedAppUserOne).not.toBe(null)
    //     expect(insertedAppUserTwo).toThrow("MongoError: E11000 duplicate key error collection: test.appusers index: phone_1 dup key: { phone: \"12345678\" } ")
    // })
})