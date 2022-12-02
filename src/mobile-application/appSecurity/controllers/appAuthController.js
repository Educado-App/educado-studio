/**
  * Login Controller for an app user
  * 
  * Last Modified: 30-11-2022
  **/

const { HttpMethodNotAllowedError } = require('../../../helpers/error')

module.exports = function makeAppAuthController(authAppService) {

    return async function handle(httpRequest) {
        switch (httpRequest.method) {
            case 'POST':
                return await postLoginAppUser(httpRequest)
            default:
                throw new HttpMethodNotAllowedError(httpRequest.method)
        }
    }

    async function postLoginAppUser(httpRequest) {
        appUser = httpRequest.body

        // Uses appAuthService to authenticate the 
        // app users information is valid
        const response = await authAppService.authenticateApp(appUser)

        return {
            success: true,
            status: 200,
            data: response
        }
    }
    
}