const { HttpMethodNotAllowedError } = require('../../../helpers/error')

//create use cases
//const { addCourse, editCourse } = require('../use-cases')

module.exports = function makeRoleController({ roleList }) {

    return async function handle(httpRequest) {

        switch (httpRequest.method) {
            case 'GET':
                return await getRole(httpRequest)
            default:
                throw new HttpMethodNotAllowedError(httpRequest.method)
        }
    }

    async function getRole(httpRequest) {

        const id = httpRequest.params.id

        const results = id ?
            await roleList.findById(id) :
            await roleList.findAll()

        return {
            success: true,
            status: 200,
            data: results
        }

    }
}