module.exports = function makeAppUserList({ dbModel }) {

    return Object.freeze({
        add,
        findByPhone
    })


    async function add(appUserModel) {
        const result = await dbModel.create({
            ...appUserModel
        })

        const { ...appUserModelInfo } = result._doc
        return { ...appUserModelInfo }
    }

    async function findByPhone ({phone: _phone}) {
        const db = await dbModel()
        return await db
            .collection('appuser')
            .findOne(_phone)
    }
}