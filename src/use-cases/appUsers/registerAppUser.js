/**
  * Use-case for registering an app user
  * 
  * Last Modified: 08-11-2022
  * By: Anton + Charlotte
  **/

import makeAppUser from '../appUsers'
export default function makeRegisterAppUser ({appUserDb}) {
    return async function makeRegisteruser (appUserInfo) {
        const appUser = makeAppUser(appUserInfo)

        // findByHash is not something we are experts on:
        const exists = await appUserDb.findByHash({hash: appUser.getHash()})
        // This is nice:
        if (exists) {
            return exists
        }
        
        // think about handle moderation in use-cases
        return appUserDb.insert({
            phone: makeAppUser.phone,
            password: makeAppUser.password,
            timeOfLogin: makeAppUser.timeOfLogin
        })
    }
}