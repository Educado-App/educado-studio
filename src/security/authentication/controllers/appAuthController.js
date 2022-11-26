const { HttpMethodNotAllowedError } = require('../../../helpers/error')

module.exports = function makeAppAuthController(authAppService) {

    return async function handle(httpRequest) {

        switch (httpRequest.method) {
            case 'POST':
                return await postAppUser(httpRequest)
            default:
                throw new HttpMethodNotAllowedError(httpRequest.method)
        }
    }

    async function postAppUser(httpRequest) {
        appUser = httpRequest.body

        const response = await authAppService.authenticateApp(appUser)

        return {
            success: true,
            status: 200,
            data: response
        }
    }

    
}