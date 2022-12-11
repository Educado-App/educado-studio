const { ValidationError } = require("../../../helpers/error")
module.exports = function makeRoleList({ dbModel }) {

    return Object.freeze({
        findById,
        add,
        remove,
        update
    })

    async function findById(id) {
        const result = await dbModel.findById(id)
        return result?.toObject()
    }

    async function add({ key: _id, name: name, permissions: permissions }) {
        const result = await dbModel.create({
            _id,
            name,
            permissions: permissions
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