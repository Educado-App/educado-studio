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

    async function add({ id: _id, ...exercise }) {

        const result = await dbModel.create({
            _id,
            ...exercise,
        })

        const { _id: id, ...exerciseInfo } = result._doc
        return { id, ...exerciseInfo }
    }

    async function remove({ id: _id, ...exercise }) {
        const result = await dbModel.deleteMany({ _id, ...exercise })

        return result.deletedCount
    }

    async function update({ id: _id, ...changes }) {

        const result = await dbModel.findOneAndUpdate({ _id }, { ...changes }, { new: true })
        return result
    }
}