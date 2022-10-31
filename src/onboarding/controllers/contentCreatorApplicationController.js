const { makeHttpError } = require('../../helpers/error')
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
                return makeHttpError({
                    status: 405,
                    message: `Method '${httpRequest.method}' is not allowed`
                })
        }

    }

    async function getContentCreatorApplication(httpRequest) {

        const id = httpRequest.params.id
        try {
            const results = id ?
                await contentCreatorApplicationList.findById(id) :
                await contentCreatorApplicationList.findAll(httpRequest.queryParams)

            return {
                success: true,
                status: 200,
                data: results
            }

        } catch (error) {
            return makeHttpError({ status: 400, message: error.message })
        }

    }

    async function postContentCreatorApplication(httpRequest) {

        const applicationInfo = httpRequest.body
        try {

            const created = await addCCApplication(applicationInfo)

            return {
                success: true,
                status: 201,
                data: created
            }

        } catch (error) {
            return makeHttpError({ status: 400, message: error.message })
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

        const { action, errors } = Params.validate({ schema: allowedActionsSchema, data: httpRequest.queryParams })

        if (errors) { return makeHttpError({ status: 400, message: errors }) }

        if (!Id.isValid(id)) {
            return makeHttpError({ status: 400, message: `Invalid or missing id` })
        }

        const existing = await contentCreatorApplicationList.findById(id)
        if (!existing) {
            return makeHttpError({ status: 400, message: `No content creator application with id '${id}' was found` })
        }

        let updated
        try {
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

        } catch (error) {
            return makeHttpError({ status: 400, message: error.message })
        }

    }

}
