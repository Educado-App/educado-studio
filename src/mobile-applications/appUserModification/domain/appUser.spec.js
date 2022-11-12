const makeFakeAppUser = require('../../../../__tests__/fixtures/fakeAppUser')
const { makeAppUser } = require('.')

describe("AppUser", () => {

  it("Must have a valid phone number", async () => {
    const fakeAppUser = makeFakeAppUser()

    const badAppUser = { ...fakeAppUser, phone: "ABCDEFGH" }
    const goodAppUser = { ...fakeAppUser, phone: "12345678" }

    expect(() => makeAppUser(badAppUser)).toThrow("AppUser must have a valid phone number")
    expect(() => makeAppUser(goodAppUser)).not.toThrow()
  })

  it("must have a valid password", async () => {
    const fakeUser = makeFakeUser()

    expect(() => makeUser({ ...fakeUser, password: "" })).toThrow("User must have a password")
    expect(() => makeUser({ ...fakeUser, password: "1234567" })).toThrow("Password should be atleast 8 characters long")
    expect(() => makeUser({ ...fakeUser, password: "withoutcapitalletter" })).toThrow("Password must contain a capital letter")
  })

  it("must have an encrypted password", async () => {
    const fakeUser = makeFakeUser()

    const madeUser = makeUser(fakeUser)

    expect(madeUser).toHaveProperty('salt')
    expect(madeUser).toHaveProperty('hash')

  })

})
