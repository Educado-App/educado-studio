const { HttpMethodNotAllowedError } = require('../../helpers/error')

//create use cases
const { addGroup } = require('../use-cases')


module.exports = function makeRoleController({ profileList }) {

    return async function handle(httpRequest) {

        switch (httpRequest.method) {
            case 'POST':
                return await postGroup(httpRequest)
            default:
                throw new HttpMethodNotAllowedError(httpRequest.method)
        }
    }
    
    async function postGroup(httpRequest) {
        const id = httpRequest.params.id
        const group = httpRequest.params.group
        const profile = await profileList.findById(id)

        const posted = await addGroup({ ...profile,groups:group })
        return {
            success: true,
            status: 201,
            data: posted
        }

    }
}