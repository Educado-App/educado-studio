const { makeSection } = require('../domain')

module.exports = function makeEditSection({ sectionList }) {

    return async function editSection({ ...changes }) {

        const section = makeSection({ id: changes._id, ...changes })

        return await sectionList.update({
            id: section.getId(),
            title: section.getTitle(),
            modifiedAt: new Date(),
        })
    }
}