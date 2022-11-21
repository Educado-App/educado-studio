const { HttpMethodNotAllowedError } = require('../../helpers/error')

module.exports = function makePublicCourseController({ courseList }) {

    return async function handle(httpRequest) {

        switch (httpRequest.method) {
            case 'GET':
                return await getCourse(httpRequest)

            default:
                throw new HttpMethodNotAllowedError(httpRequest.method)
        }

    }

    async function getCourse(httpRequest) {

        const id = httpRequest.params.id

        const results = id ?
            await courseList.findById(id) :
            await courseList.findAll({ ...httpRequest.queryParams, published: true })

        return {
            success: true,
            status: 200,
            data: results
        }

    }

}