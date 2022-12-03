module.exports = function makeCategoryList({ dbModel }) {

    return Object.freeze({
        findAll,
        add,
        remove
    })
    
    async function findAll() {

        const results = await dbModel
            .find()
            .sort('name')

        return results.map((doc) => doc.toObject({ getters: true, virtuals: true }))
    }

    async function add({ id: _id, ...category }) {

        const result = await dbModel.create({
            _id,
            ...category,
        })

        return result?.toObject({ getters: true, virtuals: true })
    }

    async function remove({ id: _id, ...category }) {
        const result = await dbModel.deleteMany(_id ? { _id } : category)

        return result.deletedCount
    }


}