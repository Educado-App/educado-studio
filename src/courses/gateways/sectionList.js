const { ValidationError } = require("../../helpers/error")

module.exports = function makeSectionList({ dbModel, Id }) {

    return Object.freeze({
        findById,
        findAllByCourseId,
        add,
        remove,
        update
    })

    async function findById(id) {

        if (!Id.isValid(id)) throw new ValidationError(`Invalid section id '${id}'`)

        const result = await dbModel.findById(id)
            .populate('exercises')

        return result?.toObject({ getters: true, virtuals: true })
    }

    async function findAllByCourseId(id) {

        if (!Id.isValid(id)) throw new ValidationError(`Invalid course id '${id}'`)

        const results = await dbModel
            .find({ parentCourse: id })
            .sort('sectionNumber')

        return results.map((doc) => doc.toObject({ getters: true, virtuals: true }))
    }

    async function add({ id: _id, ...section }) {

        const result = await dbModel.create({
            _id,
            ...section,
            exercises: section.exercises.map(exercise => exercise.id)
        })

        return result?.toObject({ getters: true, virtuals: true })
    }

    async function remove({ id: _id, ...section }) {
        const result = await dbModel.deleteMany(_id ? { _id } : section)

        return result.deletedCount
    }

    async function update({ id: _id, ...changes }) {

        const result = await dbModel.findOneAndUpdate({ _id }, {
            $set: { ...changes }
        }, { new: true })

        return result
    }
}