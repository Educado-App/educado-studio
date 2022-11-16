module.exports = function buildMakeProfile({ Id }) {

    return function makeProfile({
        id = Id.makeId(),
        firstName,
        lastName,
        user,
        modifiedAt = new Date()
    } = {}) {

        if (!firstName) throw new Error("Profile must contain a first name")
        if (!lastName) throw new Error("Profile must contain a last name")
        if (!user) throw new Error("Profile must be associated to a user")
        if (!Id.isValid(user.id)) throw new Error("Profile must have a valid user id")

        return Object.freeze({
            id,
            firstName,
            lastName,
            user,
            modifiedAt
        })

    }
}