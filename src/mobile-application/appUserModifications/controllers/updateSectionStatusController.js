/**
  * Controller for updating a sections isComplete status
  * 
  * Last Modified: 11-12-2022
  **/

const { appUserList } = require('../gateways')

exports.updateSectionStatus = async function (req, res, next) {
    try {
        // find the user by ID
        const user = await appUserList.findById(req.params.id)
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        // find the course in the user's activeCourses list
        const course = await appUserList.findCourseById(user, req.params.courseId)
        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            })
        }

        // find the section in the course's sections array
        const section = await appUserList.findSectionById(course, req.params.sectionId)
        if (!section) {
            return res.status(404).json({
                message: 'Section not found'
            })
        }
        try {

        // update isComplete of the section with true
        section.isComplete = true

        // find the index of the section and update
        const sectionIndex = course.sections.findIndex(s => s._id == section._id)
        course.sections[sectionIndex] = section

        // save the updated course
        user.activeCourses[req.params.courseId] = course

        await user.save()

        res.json(user)
    } catch (error) {
        // Handle error if section is not updated properly
        return res.status(500).json({
            message: 'Error updating section completion'
        })
    }
    } catch (err) {
        return next(err)
    }

}
