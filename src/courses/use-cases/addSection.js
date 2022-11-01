const { makeSection } = require('../domain')
const { makeCourse } = require('../domain')

module.exports = function makeAddSection({ sectionList, courseList }) {

    return async function addSection({ sectionInfo, courseId }) {

        const courseDoc = await courseList.findById(courseId)
        
        const course = makeCourse({ id: courseDoc.id, ...courseDoc })
        const section = makeSection(sectionInfo)

        course.addSection(section)

        await courseList.update({
            id: course.getId(),
            sections: course.getSections().map(section => section.id),
            modifiedAt: new Date()
        })

        return await sectionList.add({
            id: section.id,
            title: section.title,
            sectionNumber: section.getSectionNumber(),
            description: section.description,
            exercises: section.getExercises(),
            createdAt: new Date(),
            modifiedAt: new Date(),
        })

    }
}