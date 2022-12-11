const { HttpMethodNotAllowedError } = require('../../helpers/error')

module.exports = function makeCourseController({ categoryList }) {

    return async function handle(httpRequest) {

        switch (httpRequest.method) {
            case 'GET':
                return await getCategories(httpRequest)

            default:
                throw new HttpMethodNotAllowedError(httpRequest.method)
        }
    }

    async function getCategories(httpRequest) {

        const results = await categoryList.findAll()

        return {
            success: true,
            status: 200,
            data: results
        }

    }
}