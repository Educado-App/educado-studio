const { makeCourse } = require('../domain')

module.exports = function makeEditCourse({ courseList }) {

    return async function editCourse({ ...changes }) {

        const course = makeCourse({ id: changes._id, ...changes })

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