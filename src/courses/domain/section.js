module.exports = function buildMakeSection({ Id }) {

    return function makeSection({
        id = Id.makeId(),
        title,
        sequenceNumber,
        createdAt = new Date(),
        modifiedAt = new Date()
    }) {

        return Object.freeze({
            id,
            title,
            sequenceNumber,
            createdAt,
            modifiedAt,
        })

    }
}
