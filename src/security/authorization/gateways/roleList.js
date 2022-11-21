const { ValidationError } = require("../../../helpers/error")

const findAllSchema = {
    type: 'object',
    properties: {
        'name': { type: 'string' },
        'before': { type: 'string', format: 'date' },
        'after': { type: 'string', format: 'date' },
    },
}

module.exports = function makeRoleList({ dbModel, Params, ParamsSchema, Id }) {

    return Object.freeze({
        findAll,
        findById,
        add,
        remove,
        update
    })

    async function findAll({
        sortBy = '-createdAt',
        published: _published,
        limit = 50,
        offset = 0,
        ...conditions
    } = {}) {

        const { name, before, after } = Params.validate({
            schema: ParamsSchema.extendFindAllSchema(findAllSchema),
            data: { sortBy, limit, offset, ...conditions }
        })

        const query = {
            $and: [
                name ? { name: new RegExp(name, 'i') } : {},
                before ? { createdAt: { $lte: new Date(before) } } : {},
                after ? { createdAt: { $gte: new Date(after) } } : {},
            ]
        }

        const results = await dbModel
            .find(query)
            .sort(sortBy)
            .populate({
                path: 'author category',
                select: '-user'
            })
            .select('-sections')
            .limit(parseInt(limit))
            .skip(parseInt(offset))

        return results.map((doc) => doc.toObject())
    }

    async function findById(id) {

        if (!Id.isValid(id)) throw new ValidationError(`Invalid course id '${id}'`)

        const result = await dbModel
            .findById(id)
            /*.populate({
                path: 'sections author category',
                select: '-user',
                populate: {
                    path: 'exercises',
                },
            })*/

        return result?.toObject()
    }

    async function add({ id: _id, ...role }) {

        const result = await dbModel.create({
            _id,
            ...role,
            permissions: role.permissions.map(permission => permission.id)
        })

        return result?.toObject()
    }

    async function remove({ id: _id, ...role }) {
        const result = await dbModel.deleteMany(_id ? { _id } : role)

        return result.deletedCount
    }

    async function update({ id: _id, ...changes }) {

        const result = await dbModel.findOneAndUpdate({ _id }, {
            $set: changes
        }, { new: true })

        return result?.toObject()
    }
}