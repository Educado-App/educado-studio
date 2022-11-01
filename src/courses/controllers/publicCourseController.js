const { makeHttpError } = require('../../helpers/error')

module.exports = function makePublicCourseController({ courseList }) {

    return async function handle(httpRequest) {

        switch (httpRequest.method) {
            case 'GET':
                return await getCourse(httpRequest)

            default:
                return makeHttpError({
                    status: 405,
                    message: `Method '${httpRequest.method}' is not allowed`
                })
        }

    }

    async function getCourse(httpRequest) {

        const id = httpRequest.params.id
        
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

}