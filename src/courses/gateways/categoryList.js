module.exports = function makeCategoryList({ dbModel, Id }) {

    return Object.freeze({
        findAll,
        findById,
        add,
        remove
    })
    
    async function findAll() {

        const results = await dbModel
            .find()
            .sort('name')

        return results.map((doc) => doc.toObject({ getters: true, virtuals: true }))
    }

    async function findById(id) {

        if (!Id.isValid(id)) throw new ValidationError(`Invalid category id '${id}'`)

        const result = await dbModel.findById(id)

        return result?.toObject({ getters: true, virtuals: true })
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