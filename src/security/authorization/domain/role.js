const { ValidationError } = require("../../../helpers/error")

module.exports = function buildMakeRole( Id ) {

    return function makeRole({
        key,
        name,
        permissions,
        createdAt = new Date(),
        modifiedAt = new Date()
    }) {
        if (!key) throw new ValidationError('Role must have a unique key')
        if (!name) throw new ValidationError('Role must have a name')

        return Object.freeze({
            key,
            name,
            createdAt,
            modifiedAt,
            getPermissions: () => permissions,
        })
    }
}