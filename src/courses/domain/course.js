module.exports = function buildMakeCourse({ Id, makeSection }) {

    return function makeCourse({
        id = Id.makeId(),
        title,
        description = "",
        author,
        coverImg,
        category,
        published = true,
        sections = [],
        createdAt = new Date(),
        modifiedAt = new Date()
    }) {

        const validSections = sections.map(section => makeSection(section))

        if (!title) throw new Error('Course must have a title')
        if (!author) throw new Error('Course must have an author')
        if (!description) throw new Error('Course must have a description')

        return Object.freeze({
            getId: () => id,
            getTitle: () => title,
            getDescription: () => description,
            getAuthor: () => author,
            getCoverImg: () => coverImg,
            getCategory: () => category,
            isPublished: () => published,
            getCreatedAt: () => createdAt,
            getModifiedAt: () => modifiedAt,
            getSections: () => validSections,
            publish: () => published = true,
            unpublish: () => published = false
        })
    }
}