const { makeCourse } = require('../domain')

module.exports = function makeReOrderSections({ sectionList, courseList }) {

    return async function reOrderSections(moveTable) {

        if (!moveTable) return

        // Get out the parent course object from one of the sections
        const sectionId = moveTable[0].section
        const sectionDoc = await sectionList.findById(sectionId)
        const courseDoc = await courseList.findById(sectionDoc.parentCourse)

        const course = makeCourse(courseDoc)

        // For each move, call course move section and let it handle the internal moving
        moveTable.forEach(move => {
            course.moveSectionById({ section: move.section, to: move.moveTo })
        })
        
        await courseList.update({
            id: course.getId(),
            modifiedAt: course.getModifiedAt()
        })

        // Update the position of each section in the list
        course.getSections().map(async (section) => 
            await sectionList.update({
                id: section.id,
                sectionNumber: section.sectionNumber,
                modifiedAt: new Date()
            })
        )

        return await sectionList.findAllByCourseId(course.getId())
    }
}