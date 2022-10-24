module.exports = function buildMakeCourse({ Id, makeSection }) {

    return function makeCourse({
        id = Id.makeId(),
        title,
        author,
        category,
        description = "",
        published,
        sections = [],
        createdAt = new Date(),
        modifiedAt = new Date()
    }) {

        return Object.freeze({
            id,
            title,
            author,
            category,
            description,
            published,
            sections,
            createdAt,
            modifiedAt,
            addSection: (sectionInfo) => {
                const section = makeSection(sectionInfo)
                sections.push(section) 
            },
            publish : () => published = true,
            unpublish : () => published = false
        })

    }
}
