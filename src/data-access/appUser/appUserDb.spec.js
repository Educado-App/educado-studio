/**
  * data-access for an app user
  * 
  * Last Modified: 09-11-2022
  * By: Anton + Charlotte
  **/

import makeDb from '../../../__tests__/fixtures/db'
import makeAppUserDb from './appUserDb'
import makeFakeAppUser from '../../../__tests__/fixtures/fakeAppUser'

describe('App user db', () => {
    let appUserDb

    beforeEach(async() => {
        appUserDb = makeAppUserDb(makeDb)
    })

    it('Creates a new app user', async() => {
        await appUserDb.insert(makeFakeAppUser)
        const insertedUser = await appUserDb.findOne({_id: makeAppUserDb._id})
        // Object Id is defined when successfully saved to collection.
        expect(insertedUser._id).toBeDefined()
        expect(insertedUser).toEqual(makeFakeAppUser)
    })

    it('Find app user by id', async() => {
        await makeAppUserDb.insert(makeFakeAppUser)
        const insertedUser = await appUserDb.findById({_id: makeAppUserDb._id})
        
        expect(insertedUser._id).toEqual(makeFakeAppUser._id)
    })
    

    it('Find app user by their phone number', async() => {
        await makeAppUserDb.insert(makeFakeAppUser)
        const insertedUser = await appUserDb.findByPhone({_phone: makeAppUserDb._phone})

        expect(insertedUser._phone).toEqual(makeFakeAppUser._phone)
    })

    it('Removes an app user from the collection', async() => {
        const fakeAppUser = await makeAppUserDb.insert(makeFakeAppUser)

        let removedAppUser = await appUserDb.remove(fakeAppUser)
        expect(removedAppUser).toBe(1)
        
    })

    it('Updates an app user from the collection', async() => {
        const insertedUser = await appUserDb.findOne({_id: makeAppUserDb._id})
        // Update phone to 87654321
        makeAppUserDb.update()
    })
    
})