module.exports = function makeSectionList({ dbModel, Id }) {

    return Object.freeze({
        findById,
        findAllByCourseId,
        add,
        remove,
        update
    })

    async function findById(id) {

        if (!Id.isValid(id)) throw new Error(`Invalid section id '${id}'`)

        const result = await dbModel.findById(id)
            .populate('exercises')

        const { _id: foundId, ...sectionInfo } = result._doc

        return { id: foundId, ...sectionInfo }
    }

    async function findAllByCourseId(id) {

        if (!Id.isValid(id)) throw new Error(`Invalid course id '${id}'`)

        return await dbModel
            .find({ parentCourse: id })
            .sort('sectionNumber')
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

    async function remove({ id: _id, ...section }) {
        const result = await dbModel.deleteMany({ _id, ...section })

        return result.deletedCount
    }

    async function update({ id: _id, ...changes }) {

        const result = await dbModel.findOneAndUpdate({ _id }, { ...changes }, { new: true })
        return result
    }
}