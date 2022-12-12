const { makeCourse } = require('../domain')

module.exports = function makeAddCourse({ courseList }) {

    return async function addCourse(courseInfo) {

        const course = makeCourse({
            author: courseInfo.author,
            title: courseInfo.title,
            category: courseInfo.category,
            description: courseInfo.description,
            coverImg: courseInfo.coverImg
        })

        return await courseList.add({
            id: course.getId(),
            title: course.getTitle(),
            category: course.getCategory(),
            coverImg: course.getCoverImg(),
            description: course.getDescription(),
            author: course.getAuthor(),
            published: course.isPublished(),
            sections: course.getSections(),
            modifiedAt: course.getModifiedAt(),
            createdAt: course.getCreatedAt(),
        })
    }
}