const { HttpMethodNotAllowedError } = require('../../../helpers/error')

module.exports = function makeAuthController(authService) {

    return async function handle(httpRequest) {

        switch (httpRequest.method) {
            case 'POST':
                return await postUser(httpRequest)
            default:
                throw new HttpMethodNotAllowedError(httpRequest.method)
        }
    }

    async function postUser(httpRequest) {
        user = httpRequest.body

        const response = await authService.authenticate(user)

        return {
            success: true,
            status: 200,
            data: response
        }

    }
}