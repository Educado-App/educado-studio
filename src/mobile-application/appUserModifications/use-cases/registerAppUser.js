/**
  * Use-case for registering an app user
  * 
  * Last Modified: 08-11-2022
  * By: Anton + Charlotte
  **/

const { makeUser } = require('../domain')

module.exports = function makeRegisterAppUser ({ appUserList }) {

    return async function makeRegisteruser (appUserInfo) {

        const appUser = makeUser({...appUserInfo})

        //  const exists = await appUserList.findByPhone({phone: appUser.phone})
        //  if (exists) {
        //      return exists
        //  }

        return await appUserList.add({
            phone: appUser.getPhone(),
            password: appUser.getPassword(),
            //timeOfLogin: appUser.getTimeOfLogin()
        })
    }
}