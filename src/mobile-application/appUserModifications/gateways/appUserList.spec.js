/**
  * data-access for an app user
  * 
  * Last Modified: 21-11-2022
  **/

const { appUserList } = require('.')
const makeFakeAppUser = require('../../../../__tests__/fixtures/fakeAppUser')

describe('App user db', () => {

    it('Creates a new app user', async () => {
        const fakeAppUser = makeFakeAppUser()
        await appUserList.add(fakeAppUser)

        expect(fakeAppUser).not.toBeNull()

    })

    it('Find app user by id', async () => {
        const fakeAppUser = makeFakeAppUser()

        const inserted = await appUserList.add(fakeAppUser)

        expect(inserted).not.toBeNull()

        const insertedUser = await appUserList.findById(inserted.id)

        expect(insertedUser).not.toBeNull()
        expect(insertedUser.id).toBe(inserted.id)
    })


    it('Find app user by their phone number', async () => {
        const fakeAppUser = makeFakeAppUser()
        await appUserList.add(fakeAppUser)

        const insertedUser = await appUserList.findByPhone(fakeAppUser.phone)

        expect(insertedUser.phone).toEqual(fakeAppUser.phone)
    })

    it('Removes an app user from the collection', async () => {
        const fakeAppUser = makeFakeAppUser()
        const addedUser = await appUserList.add(fakeAppUser)

        expect(addedUser).not.toBeNull()

        const removed = await appUserList.remove(addedUser.id)

        // remove returns the removed document.
        // Testing to see if the removed documents id matches the 
        // originally added id
        expect(removed.id).toBe(addedUser.id)
    })

})