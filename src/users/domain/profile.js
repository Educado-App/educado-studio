const { ValidationError } = require("../../helpers/error")

module.exports = function buildMakeProfile({ Id }) {

    return function makeProfile({
        id = Id.makeId(),
        firstName,
        lastName,
        user,
        groups,
        modifiedAt = new Date()
    } = {}) {

        if (!firstName) throw new ValidationError("Profile must contain a first name")
        if (!lastName) throw new ValidationError("Profile must contain a last name")
        if (!user) throw new ValidationError("Profile must be associated to a user")
        if (!Id.isValid(user.id)) throw new ValidationError("Profile must have a valid user id")

        return Object.freeze({
            id,
            firstName,
            lastName,
            user,
            groups,
            modifiedAt
        })

    }
}