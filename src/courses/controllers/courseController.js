const { makeHttpError } = require('../../helpers/error')

const { addCourse, editCourse } = require('../use-cases')

module.exports = function makeCourseController({ courseList }) {

    return async function handle(httpRequest) {

        switch (httpRequest.method) {
            case 'GET':
                return await getCourse(httpRequest)

            case 'POST':
                return await postCourse(httpRequest)

            case 'PUT':
                return await putCourse(httpRequest)

            default:
                return makeHttpError({
                    status: 405,
                    message: `Method '${httpRequest.method}' is not allowed`
                })
        }

    }

    async function getCourse(httpRequest) {

        const id = httpRequest.params.id
        const author = httpRequest.context.profile

        try {
            const results = id ?
                await courseList.findById(id) :
                await courseList.findAllByAuthor({ id: author.id })

            return {
                success: true,
                status: 200,
                data: results
            }

        } catch (error) {
            return makeHttpError({ status: 400, message: error.message })
        }

    }

    async function postCourse(httpRequest) {

        const courseInfo = httpRequest.body
        const author = httpRequest.context.profile

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

    }

    async function putCourse(httpRequest) {

        const courseChanges = httpRequest.body
        const courseId = httpRequest.params.id

        try {
            const updated = await editCourse({
                id: courseId,
                ...courseChanges
            })

            return {
                success: true,
                status: 202,
                data: updated
            }

        } catch (error) {
            return makeHttpError({ status: 400, message: error.message })
        }
    }
}