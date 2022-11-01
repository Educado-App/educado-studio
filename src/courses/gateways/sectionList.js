module.exports = function makeSectionList({ dbModel }) {

    return Object.freeze({
        findById,
        add,
        remove,
        update
    })

    async function findById(id) {
        const result = await dbModel.findById(id)
        const { _id: foundId, ...courseInfo } = result._doc

        return { id: foundId, ...courseInfo }
    }

    async function add(section) {

        const result = await dbModel.create({
            ...section,
            _id: section.id,
            exercises: section.exercises.map(exercise => exercise.id)
        })

        const { _id: id, ...sectionInfo } = result._doc
        return { id, ...sectionInfo }
    }

    async function remove(section) {
        const result = await dbModel.deleteMany(section)

        return result.deletedCount
    }

    async function update({ id: _id, ...changes }) {

        const result = await dbModel.findOneAndUpdate({ _id }, { ...changes }, { new: true })
        return result
    }
}