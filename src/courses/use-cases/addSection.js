const { makeCourse } = require('../domain')

module.exports = function makeAddSection({ sectionList, courseList }) {

    return async function addSection({ info: sectionInfo, toCourse: courseId }) {

        const courseDoc = await courseList.findById(courseId)

        const course = makeCourse({ id: courseDoc.id, ...courseDoc })

        const addedSection = course.addSection(sectionInfo)

        await courseList.update({
            id: course.getId(),
            sections: course.getSections().map(section => section.id),
            modifiedAt: new Date()
        })

        return await sectionList.add({
            id: addedSection.id,
            parentCourse: course.getId(),
            title: addedSection.title,
            sectionNumber: addedSection.sectionNumber,
            description: addedSection.description,
            exercises: addedSection.getExercises(),
            createdAt: new Date(),
            modifiedAt: new Date(),
        })

    }
}