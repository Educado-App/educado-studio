const { ValidationError } = require("../../../helpers/error")

module.exports = function makeRoleList({ dbModel }) {

    return Object.freeze({
        findById,
        add,
        remove,
        update
    })

    async function findById(id) {

        if (!Id.isValid(id)) throw new ValidationError(`Invalid course id '${id}'`)

        const result = await dbModel.findById(id)
            /*.populate({
                path: 'id',
                /*select: '-user',
                populate: {
                    path: 'exercises',
                },
            })*/

        return result?.toObject()
    }

    async function add({ id: _id }) {

        //console.log(_id)
        const result = await dbModel.create(
            _id,
        )   

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