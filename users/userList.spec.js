const connectDb = require('../__tests__/fixtures/db')

const { UserModel } = require("../models/User")
const makeFakeUser = require("../__tests__/fixtures/fakeUser")
const makeUserList = require("./userList")

connectDb()
const userList = makeUserList(UserModel)

describe("User List", () => {
    
    beforeEach(async () => await userList.remove({}))
    
    it("successfully adds a user to the db", async () => {
        const fakeUser = makeFakeUser()
        const addedUser = await userList.add(fakeUser)

        expect(addedUser).not.toBeNull()
    })

    it("can remove a user from the db", async () => {
        const fakeUser = makeFakeUser()
        const added = await userList.add(fakeUser)
        const removedCount = await userList.remove(added)

        expect(removedCount).toBe(1)

    })

})