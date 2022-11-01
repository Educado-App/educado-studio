const { makeCourse } = require('../domain')
const { makeHttpError } = require('../../helpers/error')

const { addCourse, editCourse } = require('../use-cases')


module.exports = function makeSectionController({ courseList: sectionList }) {

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

        const id = httpRequest.params.id

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

        const courseInfo = httpRequest.body
        const author = httpRequest.context.profile

        try {
            const posted = await addCourse({
                author,
                title: courseInfo.title,
                description: courseInfo.description,
                coverImg: courseInfo.coverImg
            })

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

        const courseChanges = httpRequest.body

        try {
            const updated = await editCourse(courseChanges)

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