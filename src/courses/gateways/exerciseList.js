const findAllSchema = {
    type: 'object',
    properties: {
        'title': { type: 'string' },
        'before': { type: 'string', format: "date" },
        'after': { type: 'string', format: "date" },
    },
}

module.exports = function makeExerciseList({ dbModel, Params, ParamsSchema }) {

    return Object.freeze({
        findAll,
        findById,
        add,
        remove,
        update
    })

    async function findAll({
        sortBy = '-createdAt',
        limit = 50,
        offset = 0,
        ...conditions
    } = {}) {

        const { title, before, after } = Params.validate({
            schema: ParamsSchema.extendFindAllSchema(findAllSchema),
            data: { sortBy, limit, offset, ...conditions }
        })

        const query = {
            $and: [
                title ? { title: new RegExp(title, 'i') } : {},
                before ? { createdAt: { $lte: new Date(before) } } : {},
                after ? { createdAt: { $gte: new Date(after) } } : {},
            ]
        }

        return await dbModel
            .find(query)
            .sort(sortBy)
            .populate({
                path: 'exercises',
                select: ''
            })
            .limit(parseInt(limit))
            .skip(parseInt(offset))
    }

    async function findById(id) {
        const result = await dbModel.findById(id)
        const { _id: foundId, ...exerciseInfo } = result._doc

        return { id: foundId, ...exerciseInfo }
    }

    async function add(exercise) {

        const result = await dbModel.create({
            ...exercise,
            exercises: exercise.exercises.map(exercise => exercise.id)
        })

        const { _id: id, ...exerciseInfo } = result._doc
        return { id, ...exerciseInfo }
    }

    async function remove(exercise) {
        const result = await dbModel.deleteMany(exercise)

        return result.deletedCount
    }

    async function update({ id: _id, ...changes }) {

        const result = await dbModel.findOneAndUpdate({ _id }, { ...changes }, { new: true })
        return result
    }
}