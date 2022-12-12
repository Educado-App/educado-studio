const { makeCourse } = require('../domain')

module.exports = function makeEditCourse({ courseList }) {

    return async function editCourse({ id, ...changes }) {

        const current = await courseList.findById(id)

        const course = makeCourse({ ...current, ...changes, category: { id: changes.category } })

        const toChange = {
            id: course.getId(),
            title: course.getTitle(),
            category: course.getCategory().id,
            description: course.getDescription(),
            modifiedAt: new Date(),
        }

        // Setting the cover image here dynamically so that if no cover image
        // is present in the changes, don't blank the existing one
        if (changes.coverImg) toChange.coverImg = changes.coverImg

        return await courseList.update(toChange)
    }
}