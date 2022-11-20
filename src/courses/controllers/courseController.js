const { HttpMethodNotAllowedError } = require('../../helpers/error')

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
                throw new HttpMethodNotAllowedError(httpRequest.method)
        }
    }

    async function getCourse(httpRequest) {

        const id = httpRequest.params.id
        const author = httpRequest.context.profile

        const results = id ?
            await courseList.findById(id) :
            await courseList.findAllByAuthor({ id: author.id })

        return {
            success: true,
            status: 200,
            data: results
        }

    }

    async function postCourse(httpRequest) {

        const courseInfo = httpRequest.body

        /* Author of the course gets set the profile sending the request */
        const author = httpRequest.context.profile

        const posted = await addCourse({ ...courseInfo, author })

        return {
            success: true,
            status: 201,
            data: posted
        }

    }

    async function putCourse(httpRequest) {

        const courseChanges = httpRequest.body
        const courseId = httpRequest.params.id

        const updated = await editCourse({
            id: courseId,
            ...courseChanges
        })

        return {
            success: true,
            status: 202,
            data: updated
        }

    }
}