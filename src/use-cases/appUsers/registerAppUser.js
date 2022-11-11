/**
  * Use-case for registering an app user
  * 
  * Last Modified: 08-11-2022
  * By: Anton + Charlotte
  **/

const { makeAppUser } = require('../../appUsers')

module.exports = function makeRegisterAppUser ({appUserDb}) {
    return async function makeRegisteruser (appUserInfo) {
        const appUser = makeAppUser({...appUserInfo})

        const exists = await appUserDb.findByPhone({phone: appUser.phone})
        if (exists) {
            return exists
        }

        // think about handle moderation in use-cases
        return await appUserDb.create({
            phone: makeAppUser.phone,
            password: makeAppUser.password,
            timeOfLogin: makeAppUser.timeOfLogin
        })
    }
}