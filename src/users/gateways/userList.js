module.exports = function makeUserList(dbModel) {

    return Object.freeze({
        add,
        remove,
        update,
        findByEmail,
        findById,
        findByGoogleId
    })

    async function add({ id: _id, ...user }) {
        const result = await dbModel.create({ _id, ...user })
        return result?.toObject({ getters: true, virtuals: true })
    }

    async function remove({ id: _id, ...user }) {
        const results = await dbModel.deleteMany(_id ? { _id } : user )

        return results.deletedCount
    }

    async function update({ _id, ...changes }) {
        const result = await dbModel.findOneAndUpdate({ _id }, { ...changes }, { new: true })
        return result?.toObject({ getters: true, virtuals: true })
    }

    async function findByEmail(email) {
        const result = await dbModel.findOne({ email: email })
        return result?.toObject({ getters: true, virtuals: true })
    }

    async function findById(id) {
        const result = await dbModel.findById(id)
        return result?.toObject({ getters: true, virtuals: true })
    }

    async function findByGoogleId(googleId) {
        const result = await dbModel.findOne({ googleID: googleId })
        return result?.toObject({ getters: true, virtuals: true })
    }
}