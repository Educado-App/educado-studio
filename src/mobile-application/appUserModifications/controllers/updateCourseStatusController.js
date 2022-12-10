/**
  * Controller for updating a course's isComplete status
  * 
  * Last Modified: 10-12-2022
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

		// Error if course does not exists
		if (!course) {
			return res.status(404).json({
				message: 'Course not found'
			})
		}

		// set the isComplete property of the course object to true
		course.isComplete = true

		await user.save()

		res.json(user)
	} catch (err) {
		return next(err)
	}

}
