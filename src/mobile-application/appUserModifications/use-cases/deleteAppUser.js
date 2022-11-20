/**
  * Use-case for deleting an app user
  * 
  * Last Modified: 18-11-2022
  * By: Anton + Charlotte
  **/

const { makeUser } = require('../domain')
 
module.exports = function makeDeleteAppUser( appUserList ){
    return async function deleteAppUser(appUserInfo) {

            const appUser = await makeUser({ id: appUserInfo._id })

            return await appUserList.remove({
                id: appUser._id
            })

    }
    
    // return async function deleteAppUser(appUser) {

    //     const id = appUserList.remove(id)

    //         if (!user) {
    //   return res.status(400).json("User not found");
    // }
    // res.status(200).json("User deleted successfully");
    // } catch(e) {
    //     res.sendStatus(500);
    // }

    //     if (id === null) {
    //         return res.status(400).send({
    //             message : "User not found."
    //         })
    //     } else {
    //         return await appUserList.remove(id)
    //     }
    // }
}