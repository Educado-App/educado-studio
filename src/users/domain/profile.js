module.exports = function buildMakeProfile({ Id, makeUser }) {

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

        const validUser = makeUser(user)

        return Object.freeze({
            id,
            firstName,
            lastName,
            validUser,
            modifiedAt
        })

    }
}