const { makeCourse } = require('../domain')

module.exports = function makeRemoveSection({ sectionList, courseList }) {

    return async function removeSection({ toRemove: sectionId, fromCourse: courseId }) {

        const courseDoc = await courseList.findById(courseId)

        const course = makeCourse({ id: courseDoc.id, ...courseDoc })

        course.removeSectionById(sectionId)

        await courseList.update({
            id: course.getId(),
            sections: course.getSections().map(section => section.id),
            modifiedAt: new Date()
        })

        return await sectionList.remove({
            id: sectionId,
        })

    }
}

