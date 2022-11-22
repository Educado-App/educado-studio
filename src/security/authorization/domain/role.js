const { ValidationError } = require("../../../helpers/error")

module.exports = function buildMakeRole( Id ) {

    return function makeRole({
        id = Id.makeId(),
        name,
        permissions,
        createdAt = new Date(),
        modifiedAt = new Date()
    }) {

        if (!name) throw new ValidationError('Role must have a name')
        if (!id) throw new ValidationError('Role must have a specific ID')

        return Object.freeze({
            id,
            name,
            createdAt,
            modifiedAt,
            getPermissions: () => permissions,
            //getPermission: (permission) => permissions.find(perm => perm.id === perm.id)
        })
    }
}