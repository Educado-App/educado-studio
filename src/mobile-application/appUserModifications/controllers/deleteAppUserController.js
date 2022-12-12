/**
  * Controller for deleting an app user
  * 
  * Last Modified: 30-11-2022
  **/

const { HttpMethodNotAllowedError } = require('../../../helpers/error')
const { deleteAppUser } = require('../use-cases')

module.exports = function makeDeleteAppUser({ }) {

    return async function handle(httpRequest) {
        switch (httpRequest.method) {
            case 'DELETE':
                return await postRemoveAppUser(httpRequest)

            default:
                throw new HttpMethodNotAllowedError(httpRequest.method)
        }
    }

    async function postRemoveAppUser(httpRequest) {
        // Finding app users id  
        const id = httpRequest.params.id

        // Calling deleteAppUser use case with id of the app user
        const deleted = await deleteAppUser({ id })

        return {
            success: true,
            statusCode: 200,
            body: deleted
        }
    }

} 
