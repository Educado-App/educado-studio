module.exports = function makeProfileList(db_model) {

    return Object.freeze({
        add,
        remove,
        findById,
        findByUserId
    })

    async function add(profile) {

        return await db_model.create({
            ...profile,
            _id: profile.id,
            user: profile.user.id
        })
    }

    async function remove(profile = {}) {
        const results = await db_model.deleteMany(profile)

        return results.deletedCount
    }

    async function findById(id) {
        return await db_model.findById(id)
    }

    async function findByUserId(user_id) {
        return await db_model.findOne({ user: user_id })
    }

}