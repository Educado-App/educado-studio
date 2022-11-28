const { HttpMethodNotAllowedError } = require('../../helpers/error')

const { reorderSections } = require('../use-cases')

module.exports = function makeReorderSectionController({ Params }) {

    return async function handle(httpRequest) {

        switch (httpRequest.method) {
            case 'PUT':
                return await putSection(httpRequest)

            default:
                throw new HttpMethodNotAllowedError(httpRequest.method)
        }

    }

    async function putSection(httpRequest) {

        const moveTable = httpRequest.body

        validateMoveTable(moveTable)

        const updated = await reorderSections(moveTable)

        return {
            success: true,
            status: 202,
            data: updated
        }

    }

    function validateMoveTable(moveTable) {
        const validMoveTable = {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    'section': { type: 'string', format: 'objectId', errorMessage: "invalid identifier" },
                    'moveTo': { type: 'number' }
                },
                required: ['section', 'moveTo'],
            }
        }

        Params.validate({
            schema: validMoveTable,
            data: moveTable,
            throwOnFail: true
        })

    }

}