const { UserModel } = require("../../models/User")

const makeFakeUser = require("../fixtures/fakeUser")
const makeUserList = require("../../users/userList")

const userList = makeUserList(UserModel)

describe("User List", () => {
    
    beforeEach(async () => await userList.remove({}))
    
    it("can add a user to the db", async () => {
        const fakeUser = makeFakeUser()
        const addedUser = await userList.add(fakeUser)

        expect(addedUser).not.toBeNull()
        expect(addedUser).toHaveProperty('joinedAt')
    })

    test.skip("can remove a user from the db", async () => {})

})