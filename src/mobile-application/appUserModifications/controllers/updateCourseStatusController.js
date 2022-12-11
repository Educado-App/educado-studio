/**
  * Controller for updating a course's isComplete status
  * 
  * Last Modified: 11-12-2022
  **/

const { appUserList } = require('../gateways')

exports.updateCourseStatus = async function (req, res, next) {
	try {
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

		try {
			// set the isComplete property of the course to true
			course.isComplete = true

			await user.save()

			res.json(user)
		} catch (error) {
			// Handle error if course is not updated properly
			return res.status(500).json({
				message: 'Error updating course completion'
			})
		}
	} catch (err) {
		return next(err)
	}
}
