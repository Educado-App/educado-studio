const { ValidationError } = require("../../helpers/error")

const findAllSchema = {
    type: 'object',
    properties: {
        'title': { type: 'string' },
        'category': { type: 'string', format: 'objectId' },
        'author': { type: 'string', format: 'objectId' },
        'published': { type: 'boolean' },
        'before': { type: 'string', format: 'date' },
        'after': { type: 'string', format: 'date' },
    },
}

module.exports = function makeCourseList({ dbModel, Params, ParamsSchema, Id }) {

    return Object.freeze({
        findAll,
        findById,
        findAllByAuthor,
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

        const { title, category, author, published, before, after } = Params.validate({
            schema: ParamsSchema.extendFindAllSchema(findAllSchema),
            data: { sortBy, published: _published, limit, offset, ...conditions }
        })

        const query = {
            $and: [
                title ? { title: new RegExp(title, 'i') } : {},
                category ? { category: category } : {},
                author ? { author: author } : {},
                typeof published !== 'undefined' ? { published } : {},
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

        return results.map((doc) => doc.toObject({ getters: true, virtuals: true }))
    }

    async function findById(id) {

        if (!Id.isValid(id)) throw new ValidationError(`Invalid course id '${id}'`)

        const result = await dbModel
            .findById(id)
            .populate({
                path: 'sections author category',
                select: '-user',
                populate: {
                    path: 'exercises',
                },
            })

        return result?.toObject({ getters: true, virtuals: true })
    }

    async function findAllByAuthor({
        //name: authorName,
        id: authorId
    }) {

        const results = await dbModel
            .find({
                $and: [
                    authorId ? { 'author': authorId } : {}
                ]
            })
            .populate({
                path: 'author category',
                select: '-user'
            })
            .select('-sections')

        return results.map((doc) => doc.toObject({ getters: true, virtuals: true }))
    }

    async function add({ id: _id, ...course }) {

        const result = await dbModel.create({
            _id,
            ...course,
            category: course.category?.id,
            author: course.author.id,
            sections: course.sections.map(section => section.id)
        })

        return result?.toObject({ getters: true, virtuals: true })
    }

    async function remove({ id: _id, ...course }) {
        const result = await dbModel.deleteMany(_id ? { _id } : course)

        return result.deletedCount
    }

    async function update({ id: _id, ...changes }) {

        const result = await dbModel.findOneAndUpdate({ _id }, {
            $set: changes
        }, { new: true })

        return result?.toObject({ getters: true, virtuals: true })
    }
}