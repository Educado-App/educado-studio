module.exports = function makeAppUserList({ dbModel }) {

    return Object.freeze({
        add,
        findByPhone
    })


    async function add({ ...appUserModel }) {
        return await dbModel.create({
            ...appUserModel
        })
    }

        // const result = await dbModel.create({
        //     ...appUserModel
        // })

        // const { ...appUserModelInfo } = result._doc
        // return { ...appUserModelInfo }

    async function findByPhone (phone) {
        //const db = await dbModel()
        return await dbModel
            .findOne({phone: phone})
    }
}