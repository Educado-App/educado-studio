module.exports = function makeCategoryList({ dbModel }) {

    return Object.freeze({
        findAll,
    })

    async function findAll() {

        const results = await dbModel
            .find()
            .sort('name')

        return results.map((doc) => doc.toObject({ getters: true, virtuals: true }))
    }

}