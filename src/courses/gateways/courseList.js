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

        return await dbModel
            .find(query)
            .sort(sortBy)
            .populate({
                path: 'author category',
                select: '-user'
            })
            .select('-sections')
            .limit(parseInt(limit))
            .skip(parseInt(offset))
    }

    async function findById(id) {

        if (!Id.isValid(id)) throw new Error(`Invalid course id '${id}'`)

        const result = await dbModel
            .findById(id)
            .populate({
                path: 'sections author',
                select: '-user',
                populate: {
                    path: 'exercises'
                }
            })

        const { _id: foundId, ...courseInfo } = result._doc

        return { id: foundId, ...courseInfo }
    }

    async function findAllByAuthor({
        //name: authorName,
        id: authorId
    }) {

        const results = await dbModel
            .find({
                $and: [authorId ? { 'author': authorId } : {}]
            })
            .populate({
                path: 'author category',
                select: '-user'
            })
            .select('-sections')

        return results
    }

    async function add(course) {

        const result = await dbModel.create({
            ...course,
            _id: course.id,
            category: "635f9ae2991d8c6da796a1cc",   //@TODO: Implement Category
            author: course.author.id,
            sections: course.sections.map(section => section.id)
        })

        const { _id: id, ...courseInfo } = result._doc
        return { id, ...courseInfo }
    }

    async function remove(course) {
        const result = await dbModel.deleteMany({ _id: course.id })

        return result.deletedCount
    }

    async function update({ id: _id, ...changes }) {

        const result = await dbModel.findOneAndUpdate({ _id }, {
            $set: { ...changes }
        }, { new: true })

        return result
    }
}