/*import makeRegisterAppUser from 'src/use-cases/appUsers/registerAppUser.js'
// need to make this path real!!!
import makeAppUsersDb from '../data-access/appUserDb'
import makeFakeAppUser from '__tests__/fixtures/fakeAppUser.js'
import makeDb from '__tests__/fixtures/db.js'

describe ('register app user', () => {
    let appUsersDb
    beforeAll(() => {
        appUsersDb = makeAppUsersDb ({ makeDb })
    })

    it('inserts app user in database', async() => {
        const newAppUser = makeFakeAppUser()

        const registerAppUser = makeRegisterAppUser({
            appUsersDb
        })

        const inserted = await registerAppUser(newAppUser)
        expect(inserted).toMatchObject(newAppUser)
    })

    it('Cannot add app user if phone number already exists', async() => {
        const newAppUser = makeFakeAppUser()
        const repeatAppUser = makeFakeAppUser()

        const registerAppUserOne = makeRegisterAppUser({
            appUsersDb
        })

        const registerAppUserTwo = makeRegisterAppUser({
            appUsersDb
        })

        const insertedCorrect = await registerAppUserOne(newAppUser)
        const notInsterted = await registerAppUserTwo(repeatAppUser)
        expect(insertedCorrect.publish).toBe(true)
        expect(notInsterted.publish).toBe(false)
    })
    
    it('Must have a valid phone number', async() => {
      const newAppUser = makeFakeAppUser()
      const tooLong = {...newAppUser, phone: '1234567891234'} // 13 characters
      const tooShort = {...newAppUser, phone: '12234567'} // 7 characters
      
      expect(tooLong).toThrow('Phone number can at most be 11 characters')
      expect(tooShort).toThrow('Phone Number must be at least 8 characters')
    
    })

    it ('Must have a valid password', async() => {
        const newAppUser = makeFakeAppUser()
        const noPassword = {...newAppUser, password: ''}
        const noCapitalLetters = {...newAppUser, password: 'nocapitalletters'}
        const tooShortPassword = {...newAppUser, password: '12Three'}

        // Test that it throws an error when there are no password
        expect(noPassword).toThrow('User must have a password')

        // Test that it throws an error when there are no capital letters in the password
        expect(noCapitalLetters).toThrow('Password must contain a capital letter')

        // Test that it throws an error when password is too short
        expect(tooShortPassword).toThrow('Password should be at least 8 characters long')
    })
    
})*/