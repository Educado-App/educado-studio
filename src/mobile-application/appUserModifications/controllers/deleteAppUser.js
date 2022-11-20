/**
  * Controller for deleting an app user
  * 
  * Last Modified: 18-11-2022
  * By: Anton + Charlotte
  **/

const { makeHttpError } = require('../../../helpers/error')
const { deleteAppUser } = require('../use-cases')

module.exports = function makeDeleteAppUser({  }) {
    
    return async function removeAppUser (httpRequest) {
        
        try {

            const deleted = await deleteAppUser(httpRequest.body.id)
            
            return {
                success: true,
                statusCode: 201,
                body: deleted
            }

        } catch (e) {

        }

    } 
}