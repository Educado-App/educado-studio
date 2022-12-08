module.exports = function buildMakeCategory({ Id }) {

    return function makeCategory({
        id = Id.makeId(),
        parent,
        name = "Other",
        icon = {},
    }) {

        return Object.freeze({
            id,
            parent,
            name,
            icon,
        })

    }
}
