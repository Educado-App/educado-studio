module.exports = function makeAppUserList({ dbModel }) {

    return Object.freeze({
        add,
        findByPhone,
        findById,
        remove
    })


    async function add({ ...appUserModel }) {
        return await dbModel.create({
            ...appUserModel
        })
    }

    async function findByPhone (phone) {
        return await dbModel
            .findOne({phone: phone})
    }

    async function findById(id) {
        return await dbModel.findById(id)
    }

    async function remove(id) {
        // Returns the removed document
        return await dbModel.findOneAndDelete({ _id: id })
    }
}