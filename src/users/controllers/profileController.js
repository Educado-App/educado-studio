const { HttpMethodNotAllowedError } = require('../../helpers/error')

module.exports = function makeProfileController({ profileList }) {

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

        const id = httpRequest.params.id

        const result = await profileList.findById(id)

        return {
            success: true,
            status: 200,
            data: result
        }
    }

    async function updateProfileInfo(httpRequest) {

        const profileId = httpRequest.params.id
        const { firstName, lastName } = httpRequest.body

        const updated = await profileList.update({
            id: profileId,
            firstName,
            lastName
        })

        return {
            success: true,
            status: 202,
            data: updated
        }
    }
}