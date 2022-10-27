const findAllSchema = {
    type: 'object',
    properties: {
        'title': { type: 'string' },
        'published': { type: 'boolean' },
        'before': { type: 'string', format: "date" },
        'after': { type: 'string', format: "date" },
    },
}

module.exports = function makeCourseList({ dbModel, Params, ParamsSchema }) {

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
        limit = 50,
        offset = 0,
        ...conditions
    } = {}) {

        const { title, published, before, after } = Params.validate({
            schema: ParamsSchema.extendFindAllSchema(findAllSchema),
            data: { sortBy, limit, offset, ...conditions }
        })

        const query = {
            $and: [
                title ? { title: new RegExp(title, 'i') } : {},
                typeof published !== 'undefined' ? { published } : {},
                before ? { createdAt: { $lte: new Date(before) } } : {},
                after ? { createdAt: { $gte: new Date(after) } } : {},
            ]
        }

        return await dbModel
            .find(query)
            .sort(sortBy)
            .limit(parseInt(limit))
            .skip(parseInt(offset))
    }



    async function findById(id) {
        const result = await dbModel.findById(id)
        const { _id: foundId, ...courseInfo } = result._doc

        return { id: foundId, ...courseInfo }
    }

    async function findAllByAuthor({
        name: authorName,
        id: authorId
    }) {


        const results = dbModel.find({
            $and: [
                authorId ? { 'author':  authorId } : {}
            ]
        })

        return results
    }

    async function add(course) {

        const result = await dbModel.create({
            ...course,
            _id: course.id,
            category: course.category.id,
            author: course.author.id,
            sections: course.sections.map(section => section.id)
        })

        const { _id: id, ...courseInfo } = result._doc
        return { id, ...courseInfo }
    }

    async function remove(course) {
        const result = await dbModel.deleteMany(course)

        return result.deletedCount
    }

    async function update({ id: _id, ...changes }) {

        const result = await dbModel.findOneAndUpdate({ _id }, { ...changes }, { new: true })
        return result
    }
}