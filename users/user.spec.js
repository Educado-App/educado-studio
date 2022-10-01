const makeFakeUser = require('../__tests__/fixtures/fakeUser')
const makeUser = require('.')

describe("User", () => {

  it("must have a valid email", async () => {
    const fakeUser = makeFakeUser()

    const badUser = { ...fakeUser, email: "badmail.com" }
    const goodUser = { ...fakeUser, email: "good@mail.com" }

    expect(() => makeUser(badUser)).toThrow("User must have a valid email")
    expect(() => makeUser(goodUser)).not.toThrow()
  })

  it("must NOT have an empty password", async () => {
    const fakeUser = makeFakeUser()

    expect(() => makeUser({ ...fakeUser, password: "" })).toThrow("Invalid password")
  })

  it("must have a password of length minimum 8", async () => {
    const fakeUser = makeFakeUser()

    expect(() => makeUser({ ...fakeUser, password: "1234567" })).toThrow("Invalid password")
  })

  it("must have a password with a capital letter", async () => {
    const fakeUser = makeFakeUser()

    expect(() => makeUser({ ...fakeUser, password: "withoutcapitalletter" })).toThrow("Invalid password")
  })

})
