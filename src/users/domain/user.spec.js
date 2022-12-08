const makeFakeUser = require('../../../__tests__/fixtures/fakeUser')
const { makeUser } = require('.')

describe("User", () => {

  it("must have a valid email", async () => {
    const fakeUser = makeFakeUser()

    const badUser = { ...fakeUser, email: "badmail.com" }
    const goodUser = { ...fakeUser, email: "good@mail.com" }

    expect(() => makeUser(badUser)).toThrow("User must have a valid email")
    expect(() => makeUser(goodUser)).not.toThrow()
  })

  it("must have a valid password", async () => {
    const fakeUser = makeFakeUser()

    expect(() => makeUser({ ...fakeUser, password: "" })).toThrow()
    expect(() => makeUser({ ...fakeUser, password: "1234567" })).toThrow()
    expect(() => makeUser({ ...fakeUser, password: "withoutcapitalletter" })).toThrow()
  })

  it("must have an encrypted password", async () => {
    const fakeUser = makeFakeUser()

    const madeUser = makeUser(fakeUser)

    expect(madeUser).toHaveProperty('salt')
    expect(madeUser).toHaveProperty('hash')

  })

})
