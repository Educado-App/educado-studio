/**
  * Use-case for registering an app user
  * 
  * Last Modified: 08-11-2022
  **/

const { makeUser } = require('../domain')

module.exports = function makeRegisterAppUser ({ appUserList }) {

    return async function makeRegisteruser (appUserInfo) {

        const appUser = makeUser({...appUserInfo})

        return await appUserList.add({
            ...appUser
        })
    }
}