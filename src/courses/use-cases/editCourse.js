const { makeCourse } = require('../domain')

module.exports = function makeEditCourse({ courseList }) {

    return async function editCourse({ id, ...changes }) {

        const current = await courseList.findById(id)

        const course = makeCourse({ ...current, ...changes })

        return await courseList.update({
            id: course.getId(),
            title: course.getTitle(),
            category: course.getCategory(),
            coverImg: course.getCoverImg(),
            description: course.getDescription(),
            modifiedAt: new Date(),
        })
    }
}