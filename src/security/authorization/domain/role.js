const { ValidationError } = require("../../../helpers/error")

module.exports = function buildMakeRole() {

    return function makeRole({
        id,
        name,
        permissions,
        createdAt = new Date(),
        modifiedAt = new Date()
    }) {

        if (!name) throw new ValidationError('Role must have a name')
        if (!id) throw new ValidationError('Role must have a specific ID')

        return Object.freeze({
            getId: () => id,
            getName: () => name,
            getCreatedAt: () => createdAt,
            getModifiedAt: () => modifiedAt,
            getPermissions: () => permissions,
            //getPermission: (permission) => permissions.find(perm => perm.id === perm.id)
        })
    }
}