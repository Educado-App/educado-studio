/**
  * Controller for deleting an app user
  * 
  * Last Modified: 20-11-2022
  * By: Anton + Charlotte
  **/

const { deleteAppUser } = require('../use-cases')

module.exports = function makeDeleteAppUser({ }) {
    
    return async function removeAppUser (httpRequest) {
        // Finding app users id  
        const id = httpRequest.params.id     
        try {
            // Calling deleteAppUser use case with id of the app user
            const deleted = await deleteAppUser({id})
            
            return {
                success: true,
                statusCode: 200,
                body: deleted
            }

        } catch (error) {
            console.log(error)
            return {
                statusCode: 400,
                body: {
                    error: error.message
                }
            }
        }
    }

} 
