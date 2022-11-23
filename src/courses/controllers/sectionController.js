const { HttpMethodNotAllowedError } = require('../../helpers/error')

const { addSection, editSection, removeSection } = require('../use-cases')


module.exports = function makeSectionController({ sectionList }) {

    return async function handle(httpRequest) {

        switch (httpRequest.method) {
            case 'GET':
                return await getSection(httpRequest)

            case 'POST':
                return await postSection(httpRequest)

            case 'PUT':
                return await putSection(httpRequest)

            case 'DELETE':
                return await deleteSection(httpRequest)

            default:
                throw new HttpMethodNotAllowedError(httpRequest.method)
        }

    }

    async function getSection(httpRequest) {

        const sectionId = httpRequest.params.sid
        const courseId = httpRequest.params.cid

        const results = sectionId ?
            await sectionList.findById(sectionId) :
            await sectionList.findAllByCourseId(courseId)

        return {
            success: true,
            status: 200,
            data: results
        }
    }

    async function postSection(httpRequest) {

        const sectionInfo = httpRequest.body
        const courseId = httpRequest.params.cid

        const posted = await addSection({
            info: sectionInfo,
            toCourse: courseId
        })

        return {
            success: true,
            status: 201,
            data: posted
        }
    }

    async function putSection(httpRequest) {

        const sectionChanges = httpRequest.body
        const sectionId = httpRequest.params.sid

        const updated = await editSection({
            id: sectionId,
            changes: sectionChanges
        })

        return {
            success: true,
            status: 202,
            data: updated
        }
    }

    async function deleteSection(httpRequest) {

        const sectionId = httpRequest.params.sid
        const courseId = httpRequest.params.cid

        await removeSection({
            fromCourse: courseId,
            toRemove: sectionId,
        })

        return {
            success: true,
            status: 204,
            data: {}
        }

    }
}