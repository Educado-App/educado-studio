const { makeRole } = require('../domain')

module.exports = function makeAddRole({ roleList }) {

    return async function addRole(roleInfo) {

        const role = makeRole({
            key: roleInfo.key,
            name: roleInfo.name,
            permissions: roleInfo.permissions
        })

        return await roleList.add({
            key: role.key,
            name: role.name,
            permissions: role.getPermissions(),
            modifiedAt: role.modifiedAt,
            createdAt: role.createdAt,
        })
    }
}