const { ValidationError, HttpMethodNotAllowedError } = require('../../helpers/error')

const { approveCCApplication, rejectCCApplication, addCCApplication } = require('../use-cases')

module.exports = function makeContentCreatorApplicationController({ contentCreatorApplicationList, Params, Id }) {

    return async function handle(httpRequest) {

        switch (httpRequest.method) {
            case 'GET':
                return await getContentCreatorApplication(httpRequest)

            case 'POST':
                return await postContentCreatorApplication(httpRequest)

            case 'PUT':
                return await putContentCreatorApplication(httpRequest)

            default:
                throw new HttpMethodNotAllowedError(httpRequest.method)
        }

    }

    async function getContentCreatorApplication(httpRequest) {

        const id = httpRequest.params.id
        const results = id ?
            await contentCreatorApplicationList.findById(id) :
            await contentCreatorApplicationList.findAll(httpRequest.queryParams)

        return {
            success: true,
            status: 200,
            data: results
        }
    }

    async function postContentCreatorApplication(httpRequest) {

        const applicationInfo = httpRequest.body

        const created = await addCCApplication(applicationInfo)

        return {
            success: true,
            status: 201,
            data: created
        }
    }

    async function putContentCreatorApplication(httpRequest) {
        const id = httpRequest.params.id
        const rejectionReason = httpRequest.body.reason

        const allowedActionsSchema = {
            type: 'object',
            properties: { 'action': { enum: ['approve', 'reject'] } },
            required: ['action']
        }

        const { action } = Params.validate({
            schema: allowedActionsSchema,
            data: httpRequest.queryParams,
            throwOnFail: true
        })

        if (!Id.isValid(id)) throw new ValidationError("Invalid or missing id")

        const existing = await contentCreatorApplicationList.findById(id)
        if (!existing) throw new ValidationError(`No content creator application with id '${id}' was found`)

        let updated
        if (action === 'approve') {
            updated = await approveCCApplication(existing)
        }
        else {
            updated = await rejectCCApplication({
                applicationInfo: existing,
                reason: rejectionReason
            })
        }

        return {
            success: true,
            status: 200,
            data: updated
        }
    }

}
