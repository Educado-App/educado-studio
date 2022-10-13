module.exports = function makeContentCreatorApplicationList(dbModel) {

    return Object.freeze({
        findAll,
        findById,
        add,
        remove,
        update
    })

    async function findAll({ approved = false } = {}) {
        const query = !approved ? { approved: false } : {}

        return await dbModel.find(query)
    }

    async function findById(id) {
        const result = await dbModel.findById(id)
        const { _id: foundId, ...contentCreatorApplicationInfo } = result._doc

        return { id: foundId, ...contentCreatorApplicationInfo }
    }

    async function add(contentCreatorApplication) {
        const result = await dbModel.create({
            _id: contentCreatorApplication.id,
            ...contentCreatorApplication
        })

        const { _id: id, ...contentCreatorApplicationInfo } = result._doc
        return { id, ...contentCreatorApplicationInfo }
    }

    async function remove(contentCreatorApplication) {
        const result = await dbModel.deleteMany(contentCreatorApplication)

        return result.deletedCount
    }

    async function update({ id: _id, ...changes }) {
        const result = await dbModel.findOneAndUpdate({ _id }, { ...changes }, { new: true })
        return result
    }
}