const makeFakeAppUser = require('../../../../__tests__/fixtures/fakeAppUser')
const { makeUser } = require('.')

describe("AppUser", () => {


    it("Must have a valid phone number", async () => {
        const fakeAppUser = makeFakeAppUser()

        const badAppUser = { ...fakeAppUser, phone: "ABCDEFGHEJ" }
        const goodAppUser = { ...fakeAppUser, phone: "12345678" }

        expect(() => makeUser(badAppUser)).toThrow("User must have a valid phone number")
        expect(() => makeUser({ ...fakeAppUser, phone: "1234567"})).toThrow("Phone Number must be at least 8 characters")
        expect(() => makeUser({ ...fakeAppUser, phone: "123456789123"})).toThrow("Phone number can at most be 11 characters")
        expect(() => makeUser(goodAppUser)).not.toThrow()
    })

    it("must have a valid password", async () => {
        const fakeAppUser = makeFakeAppUser()

        expect(() => makeUser({ ...fakeAppUser, password: "" })).toThrow("User must have a password")
        expect(() => makeUser({ ...fakeAppUser, password: "1234567" })).toThrow("Password should be at least 8 characters long")
        expect(() => makeUser({ ...fakeAppUser, password: "12345678" })).toThrow("Password must contain a letter")
    })

    it("must have an encrypted password", async () => {
        const fakeAppUser = makeFakeAppUser()

        const madeUser = makeUser(fakeAppUser)

        expect(madeUser).toHaveProperty('salt')
        expect(madeUser).toHaveProperty('hash')

    })

})
