const { makeSection } = require('../domain')

module.exports = function makeEditSection({ sectionList }) {

    return async function editSection({ id, changes }) {
        
        const sectionDoc = await sectionList.findById(id)

        const section = makeSection({ id: sectionDoc.id, ...changes })

        return await sectionList.update({
            id: section.id,
            title: section.title,
            modifiedAt: new Date(),
        })
    }
}