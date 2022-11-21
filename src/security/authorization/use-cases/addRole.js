const { makeRole } = require('../domain')

module.exports = function makeAddRole({ roleList }) {

    return async function addRole(roleInfo) {

        const role = makeRole({
            id: roleInfo.id,
            name: roleInfo.name,
            permissions: roleInfo.permissions
        })

        return await roleList.add({
            id: role.getId(),
            name: role.getName(),
            permissions: role.getPermissions(),
            modifiedAt: role.getModifiedAt(),
            createdAt: role.getCreatedAt(),
        })
    }
}