const { makeHttpError } = require('../../helpers/error')

const { addSection, editSection } = require('../use-cases')


module.exports = function makeSectionController({ sectionList }) {

    return async function handle(httpRequest) {

        switch (httpRequest.method) {
            case 'GET':
                return await getSection(httpRequest)

            case 'POST':
                return await postSection(httpRequest)

            case 'PUT':
                return await putSection(httpRequest)

            default:
                return makeHttpError({
                    status: 405,
                    message: `Method '${httpRequest.method}' is not allowed`
                })
        }

    }

    async function getSection(httpRequest) {

        const id = httpRequest.params.id ?? null
        try {
            const results = id ?
                await sectionList.findById(id) :
                await sectionList.findAll(httpRequest.queryParams)

            return {
                success: true,
                status: 200,
                data: results
            }

        } catch (error) {
            return makeHttpError({ status: 400, message: error.message })
        }

    }

    async function postSection(httpRequest) {

        const sectionInfo = httpRequest.body

        try {
            const posted = await addSection({title: sectionInfo.title})

            return {
                success: true,
                status: 201,
                data: posted
            }

        } catch (error) {
            return makeHttpError({ status: 400, message: error.message })
        }
    }

    async function putSection(httpRequest) {

        const sectionChanges = httpRequest.body

        try {
            const updated = await editSection(sectionChanges)

            return {
                success: true,
                status: 201,
                data: updated
            }

        } catch (error) {
            return makeHttpError({ status: 400, message: error.message })
        }
    }
}