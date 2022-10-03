module.exports = function makeAuthEndpointHandler(authHandler) {

    return async function handle(httpRequest) {

        switch (httpRequest.method) {
            case 'POST':
                return await postUser(httpRequest)
            default:
                return {
                    header: 'Content-Type: application/json',
                    success: false,
                    errors: JSON.stringify(`method ${httpRequest.method} not allowed`)
                }
        }
    }

    async function postUser(httpRequest) {
        user = httpRequest.body

        try {
            const response = await authHandler.authenticate(user)

            return {
                header: 'Content-Type: application/json',
                success: true,
                data: JSON.stringify(response)
            }

        } catch (error) {

            return {
                header: 'Content-Type: application/json',
                success: false,
                errors: JSON.stringify(error)
            }
        }
    }
}