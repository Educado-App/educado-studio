const { HttpMethodNotAllowedError } = require('../../../helpers/error')

module.exports = function makeAuthController({ authService, JWT }) {

    return async function handle(httpRequest) {

        switch (httpRequest.method) {
            case 'POST':
                return await loginUser(httpRequest)
            case 'GET':
                return await refreshLogin(httpRequest)
            default:
                throw new HttpMethodNotAllowedError(httpRequest.method)
        }
    }

    async function loginUser(httpRequest) {
        user = httpRequest.body

        const response = await authService.authenticate(user)

        return {
            success: true,
            status: 200,
            data: response
        }

    }

    /**
     * Hands out a new token pair from a valid refresh token
     * set in authorization header
     */
    async function refreshLogin(httpRequest) {

        const token = JWT.extractFromRequest(httpRequest)
        const { user } = JWT.verify(token)

        return {
            success: true,
            status: 200,
            data: JWT.generateTokenPair({ user })
        }

    }
}