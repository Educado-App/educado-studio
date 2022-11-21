const { ValidationError } = require("../../../helpers/error")

module.exports = function buildMakeRole({ Id, makePermission }) {

    return function makeRole({
        id = Id.makeId(),
        name,
        permissions = [],
        createdAt = new Date(),
        modifiedAt = new Date()
    }) {

        let validPermissions = permissions.map(permission => makePermission(permission))

        if (!name) throw new ValidationError('Permission must have a name')

        return Object.freeze({
            getId: () => id,
            getName: () => name,
            getCreatedAt: () => createdAt,
            getModifiedAt: () => modifiedAt,
            getPermissions: () => validPermissions,
            getPermission: (permission) => validPermission.find(perm => perm.id === perm.id)
        })
    }
}