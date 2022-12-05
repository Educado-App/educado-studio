//const courseDetailController = require('../../../courses/controllers/courseDetailController')
//const profile = require('../../../users/db-models/Profile')
const { HttpMethodNotAllowedError } = require('../../../helpers/error')

module.exports = function checkPermission(profile, controller) {
    const requirePermission = controller.permissions

    for(group in profile.groups) {
        if(requirePermission == profile.groups) {
            return true
        } else {
            throw new HttpMethodNotAllowedError(httpRequest.method)
        }

        // Check that every required permission is met somewhere in any group
    }
}