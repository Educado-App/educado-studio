/**
  * Controller for registering an app user
  * 
  * Last Modified: 30-11-2022
  **/

const { HttpMethodNotAllowedError } = require('../../../helpers/error')
const { registerAppUser } = require('../use-cases')

module.exports = function makeRegisterAppUser({ }) {

    return async function handle(httpRequest) {
        switch (httpRequest.method) {
            case 'POST':
                return await postAddAppUser(httpRequest)
        
            default:
                throw new HttpMethodNotAllowedError(httpRequest.method)
        }
    }

    async function postAddAppUser (httpRequest) {
   
        const appUserInfo = httpRequest.body

        const registered = await registerAppUser(appUserInfo)

            
        return {
            success: true,
            statusCode: 201,
            body: registered
        }

    }
}


