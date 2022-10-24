module.exports = function buildMakeCourse({ Id }) {

    return function makeCourse({
        id = Id.makeId(),
        title,
        description = "",
        author,
        coverImg,
        category,
        published = false,
        sections = [],
        createdAt = new Date(),
        modifiedAt = new Date()
    }) {

        if (!title) throw new Error('A title must be provided for making a course')
        if (!author) throw new Error('Course must have an author')
        if (!description) throw new Error('A description must be provided for making a course')

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
            getSections: () => sections,
            addSection: (section) => {
                sections.push(section) 
            },
            publish : () => published = true,
            unpublish : () => published = false
        })
    }
}