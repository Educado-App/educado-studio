module.exports = function makeUserList(db_model) {

    return Object.freeze({
        add,
        remove,
        findOneByEmail,
        findById,
        findByGoogleId
    })

    async function add(user) {
        return await db_model.create(user)
    }

    async function remove(user = {}) {
        const results = await db_model.deleteMany(user)

        return results.deletedCount
    }

    async function findOneByEmail(email) {
        return await db_model.findOne({ email: email })
    }

    async function findById(id) {
        return await db_model.findById(id)
    }

    async function findByGoogleId(googleId) {
        return await db_model.findOne({ googleID: googleId })
    }
}