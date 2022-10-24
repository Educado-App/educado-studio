const { makeCourse } = require('../domain')

module.exports = function makeAddCourse({ courseList }) {

    return async function addCourse(courseInfo) {

        const course = makeCourse(courseInfo)

        return await courseList.add({
            title: course.getTitle(),
            description: course.getDescription(),
            author: course.getAuthor(),
            coverImg: course.getCoverImg(),
            category: course.getCategory(),
            published: course.isPublished(),
            sections: course.getSections(),
            createdAt: course.getCreatedAt(),
            modifiedAt: course.getModifiedAt(),
        })
    }
}