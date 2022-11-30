/**
  * Use-case for deleting an app user
  * 
  * Last Modified: 20-11-2022
  **/

 
module.exports = function makeDeleteAppUser({ appUserList }){
    return async function deleteAppUser(appUserInfo) {

            return await appUserList.remove(appUserInfo.id)

    }
}