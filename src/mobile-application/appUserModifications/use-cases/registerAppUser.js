/**
  * Use-case for registering an app user
  * 
  * Last Modified: 08-11-2022
  * By: Anton + Charlotte
  **/

const { makeAppUser } = require('../domain')

module.exports = function makeRegisterAppUser ({ appUserDb }) {

    return async function makeRegisteruser (appUserInfo) {

        const appUser = makeAppUser(appUserInfo)

        // const exists = await appUserDb.findByPhone({phone: appUser.phone})
        // if (exists) {
        //     return exists
        // }

        return await appUserDb.add({
            phone: appUser.getPhone(),
            password: appUser.getPassword(),
            timeOfLogin: appUser.getTimeOfLogin()
        })
    }
}