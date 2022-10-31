const { makeCourse } = require('../domain')
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

        const id = httpRequest.params.id ?? null
        try {
            const results = id ?
                await courseList.findById(id) :
                await courseList.findAll(httpRequest.queryParams)

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

    async function putCourse(httpRequest) {

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

    async function postCourseWithActions(httpRequest) {
        const allowedActions = {
            type: 'object',
            properties: { 'action': { enum: ['publish', 'unpublish'] } },
            required: ['action']
        }

        const { action } = Params.validate({
            schema: allowedActions,
            data: httpRequest.body.action
        })


        const id = httpRequest.params.id


        if (!id) {
            return makeHttpError({ status: 405, message: `An id of a course must be provided as a request parameter` })
        }

        const existing = await courseList.findById(id)

        if (!existing) {
            return makeHttpError({ status: 404, message: `No course with id '${id}' was found` })
        }

        const course = makeCourse({ id: existing._id, ...existing })

        if (action == 'publish') {
            course.publish()
        }
        else {
            course.unPublish()
        }

        try {
            const updated = await courseList.update({
                id: course.getId(),
                published: course.isPublished(),
                modifiedAt: new Date()
            })

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