module.exports = function makeProfileList(dbModel) {

    return Object.freeze({
        add,
        remove,
        findById,
        findByUserId
    })

    async function add(profile) {

        const result = await dbModel.create({
            ...profile,
            _id: profile.id,
            user: profile.user.id
        })

        return result?.toObject()
    }

    async function remove({ id: _id, ...profile }) {
        const results = await dbModel.deleteMany(_id ? { _id } : profile)

        return results.deletedCount
    }

    async function findById(id) {
        const result = await dbModel.findById(id)
        return result?.toObject()
    }

    async function findByUserId(user_id) {
        const result = await dbModel.findOne({ user: user_id })
        return result?.toObject()
    }

}