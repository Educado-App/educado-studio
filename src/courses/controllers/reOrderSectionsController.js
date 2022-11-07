const { makeHttpError } = require('../../helpers/error')

const { reorderSections } = require('../use-cases')

module.exports = function makeReorderSectionController({ Params }) {

    return async function handle(httpRequest) {

        switch (httpRequest.method) {
            case 'PUT':
                return await putSection(httpRequest)

            default:
                return makeHttpError({
                    status: 405,
                    message: `Method '${httpRequest.method}' is not allowed`
                })
        }

    }

    async function putSection(httpRequest) {

        const moveTable = httpRequest.body

        try {
            validateMoveTable(moveTable)

            const updated = await reorderSections(moveTable)

            return {
                success: true,
                status: 202,
                data: updated
            }

        } catch (error) {
            return makeHttpError({ status: 400, message: error.message })
        }
    }

    function validateMoveTable(moveTable) {
        const validMoveTable = {
            type: 'array',
            items: {
                type: 'object',
                required: ['section', 'moveTo'],
                properties: {
                    'section': { type: 'string', format: 'objectId', errorMessage: "invalid identifier" },
                    'moveTo': { type: 'number' }
                }
            }
        }

        Params.validate({
            schema: validMoveTable,
            data: moveTable,
            throwOnFail: true
        })

    }

}