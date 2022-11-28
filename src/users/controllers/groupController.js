const { HttpMethodNotAllowedError } = require('../../helpers/error')

//create use cases
const { addGroup } = require('../use-cases')


module.exports = function makeRoleController({ profileList }) {

    return async function handle(httpRequest) {

        switch (httpRequest.method) {
            /*case 'PUT':
                return await putGroupsOnProfile(httpRequest)*/
            case 'POST':
                return await postGroup(httpRequest)
            /*case 'DELETE':
                return await deleteRole(httpRequest)*/
            default:
                throw new HttpMethodNotAllowedError(httpRequest.method)
        }
    }

    async function putGroupsOnProfile(httpRequest){
        const id = httpRequest.params.id
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