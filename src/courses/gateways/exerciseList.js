module.exports = function makeExerciseList({ dbModel }) {

    return Object.freeze({
        findAllBySectionId,
        findById,
        add,
        remove,
        update
    })

    async function findAllBySectionId(sid) {
        const results = await dbModel.find({ parentSection: sid })
        
        return results.map((doc) => doc.toObject())
    }

    async function findById(id) {
        const result = await dbModel.findById(id)

        return result?.toObject()
    }

    async function add({ id: _id, ...exercise }) {

        const result = await dbModel.create({
            _id,
            ...exercise,
        })

        return result?.toObject()
    }

    async function remove({ id: _id, ...exercise }) {
        const result = await dbModel.deleteMany(_id ? { _id } : exercise)

        return result.deletedCount
    }

    async function update({ id: _id, ...changes }) {

        const result = await dbModel.findOneAndUpdate({ _id }, { ...changes }, { new: true })

        return result?.toObject()
    }
}