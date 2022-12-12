const { HttpMethodNotAllowedError } = require('../../../helpers/error')

module.exports = function makePasswordManagerController({ authService, Password, Params }) {

    return async function handle(httpRequest) {

        switch (httpRequest.method) {
            case 'PUT':
                return await changePassword(httpRequest)
            default:
                throw new HttpMethodNotAllowedError(httpRequest.method)
        }
    }

    async function changePassword(httpRequest) {

        const userId = httpRequest.context.profile.user
        const { oldPassword, newPassword } = validatePasswordChangeInfo(httpRequest.body)

        const response = await authService.changePassword({ userId, oldPassword, newPassword })

        return {
            success: true,
            status: 202,
            data: response
        }
    }

    function validatePasswordChangeInfo(passwordChangeInfo) {
        const validPasswordChangeInfo = {
            type: 'object',
            properties: {
                'oldPassword': { type: 'string' },
                'newPassword': { type: 'string' }
            },
            required: ['oldPassword', 'newPassword'],
            additionalProperties: false,
        }

        return Params.validate({
            schema: validPasswordChangeInfo,
            data: passwordChangeInfo,
        })
    }
}