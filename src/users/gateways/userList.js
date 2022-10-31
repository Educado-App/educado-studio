module.exports = function makeUserList(db_model) {

    return Object.freeze({
        add,
        remove,
        update,
        findByEmail,
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

    async function update({ _id, ...changes }) {
        const result = await db_model.findOneAndUpdate({ _id }, { ...changes }, { new: true })
        return result
    }

    async function findByEmail(email) {
        return await db_model.findOne({ email: email })
    }

    async function findById(id) {
        return await db_model.findById(id)
    }

    async function findByGoogleId(googleId) {
        return await db_model.findOne({ googleID: googleId })
    }
}