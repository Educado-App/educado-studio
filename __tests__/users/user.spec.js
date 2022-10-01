const makeUser = require('../../users')
const makeFakeUser = require('../fixtures/fakeUser')

describe("User", () => {

  it("must have a valid email", async () => {
    const fakeUser = makeFakeUser()

    expect(() => makeUser({...fakeUser, email: "badmail.com"})).toThrow("User must have a valid email")
    expect(() => makeUser({...fakeUser, email: "good@mail.com"})).not.toThrow()
  })
  
  it("must NOT have an empty password", async () => {
    const fakeUser = makeFakeUser()

    expect(() => makeUser({...fakeUser, password: ""})).toThrow("Invalid password")
  })

  it("must have a password of length minimum 8", async () => {
    const fakeUser = makeFakeUser()

    expect(() => makeUser({...fakeUser, password: "1234567"})).toThrow("Invalid password")
  })

  it("must have a password with a capital letter", async () => {
    const fakeUser = makeFakeUser()

    expect(() => makeUser({...fakeUser, password: "withoutcapitalletter"})).toThrow("Invalid password")
  })

})
