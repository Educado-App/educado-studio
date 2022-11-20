const { ValidationError } = require("../../helpers/error")

module.exports = function buildMakeContentCreatorApplication({ Id }) {

    return function makeContentCreatorApplication({
        id = Id.makeId(),
        firstName,
        lastName,
        email,
        motivation,
        approved = false,
        createdAt = new Date(),
        modifiedAt = new Date()
    }) {

        if (!firstName) throw new ValidationError('A firstname must be provided in the application')
        if (!lastName) throw new ValidationError('A lastname must be provided in the application')
        if (!email) throw new ValidationError('An email must be provided in the application')

        let rejectReason = ''

        return Object.freeze({
            getId: () => id,
            getFirstName: () => firstName,
            getLastName: () => lastName,
            getEmail: () => email,
            getMotivation: () => motivation,
            isApproved: () => approved,
            getRejectReason: () => rejectReason,
            getCreatedAt: () => createdAt,
            getModifiedAt: () => modifiedAt,
            fullname: () => `${firstName} ${lastName}`,
            approve: () => approved = true,
            reject: ({ reason = 'No reason given' } = {}) => {
                approved = false
                rejectReason = reason
            }
        })
    }
}