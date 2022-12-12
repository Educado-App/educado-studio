const { HttpMethodNotAllowedError } = require('../../helpers/error')

module.exports = function makeProfileController({ profileList, Params }) {

    return async function handle(httpRequest) {

        switch (httpRequest.method) {
            case 'GET':
                return await getProfile(httpRequest)
            case 'PUT':
                return await updateProfileInfo(httpRequest)
            default:
                throw new HttpMethodNotAllowedError(httpRequest.method)
        }
    }

    async function getProfile(httpRequest) {
        let result

        const profileId = httpRequest.params.id

        if (profileId)  result = await profileList.findById(profileId)
        else            result = httpRequest.context.profile

        return {
            success: true,
            status: 200,
            data: result
        }
    }

    async function updateProfileInfo(httpRequest) {

        const profileId = httpRequest.context.profile.id

        const validatedData = validateProfileInfo(httpRequest.body)

        const updated = await profileList.update({
            id: profileId,
            ...validatedData
        })

        return {
            success: true,
            status: 202,
            data: updated
        }
    }

    function validateProfileInfo(profileInfo) {
        const validProfileInfo = {
            type: 'object',
            properties: {
                'firstName': { type: 'string' },
                'lastName': { type: 'string' }
            },
            additionalProperties: false,
        }

        return Params.validate({
            schema: validProfileInfo,
            data: profileInfo,
        })
    }
}